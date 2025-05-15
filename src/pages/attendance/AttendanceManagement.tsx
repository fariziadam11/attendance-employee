import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, QrCode, Calendar, Download, ChevronLeft, ChevronRight, 
  CheckCircle, XCircle, AlertCircle, Clock 
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface AttendanceRecord {
  id: string;
  date: Date;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
  workHours: number | null;
}

const generateMockAttendance = (currentDate: Date): AttendanceRecord[] => {
  const startDate = subDays(currentDate, 30);
  const endDate = currentDate;
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  return days.map((day) => {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const randomLate = Math.random() > 0.8;
    
    if (isWeekend) {
      return {
        id: `att-${format(day, 'yyyyMMdd')}`,
        date: day,
        checkIn: null,
        checkOut: null,
        status: 'absent',
        workHours: null,
      };
    }
    
    // Random absent day
    if (Math.random() > 0.9) {
      return {
        id: `att-${format(day, 'yyyyMMdd')}`,
        date: day,
        checkIn: null,
        checkOut: null,
        status: 'absent',
        workHours: null,
      };
    }
    
    const checkInHour = randomLate ? 9 + Math.floor(Math.random() * 2) : 8 + Math.floor(Math.random() * 2);
    const checkInMinute = Math.floor(Math.random() * 60);
    const checkOutHour = 17 + Math.floor(Math.random() * 2);
    const checkOutMinute = Math.floor(Math.random() * 60);
    
    const checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`;
    const checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMinute.toString().padStart(2, '0')}`;
    
    const workHours = checkOutHour - checkInHour + (checkOutMinute - checkInMinute) / 60;
    
    let status: 'present' | 'late' | 'half-day' = 'present';
    if (checkInHour >= 10) {
      status = 'late';
    } else if (workHours < 6) {
      status = 'half-day';
    }
    
    return {
      id: `att-${format(day, 'yyyyMMdd')}`,
      date: day,
      checkIn,
      checkOut,
      status,
      workHours: parseFloat(workHours.toFixed(1)),
    };
  });
};

const AttendanceManagement: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(
    generateMockAttendance(currentDate)
  );
  
  const filteredAttendance = attendanceData.filter((record) => {
    const dateStr = format(record.date, 'MMMM d, yyyy');
    return dateStr.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-success bg-success/10';
      case 'absent':
        return 'text-error bg-error/10';
      case 'late':
        return 'text-warning bg-warning/10';
      case 'half-day':
        return 'text-accent bg-accent/10';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-error" />;
      case 'late':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'half-day':
        return <AlertCircle className="h-4 w-4 text-accent" />;
      default:
        return null;
    }
  };
  
  const handleExportAttendance = () => {
    // In a real app, this would generate a CSV or PDF report
    toast.success('Attendance report has been exported');
  };
  
  const renderCalendarView = () => {
    const monthStart = startOfMonth(selectedMonth);
    const monthEnd = endOfMonth(selectedMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get first day of month to calculate offset
    const firstDayOfMonth = monthStart.getDay();
    
    return (
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {format(selectedMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex gap-2">
            <button
              className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={nextMonth}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 font-medium">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before the first day of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 rounded-md border border-gray-100 p-1 dark:border-gray-800"></div>
          ))}
          
          {/* Calendar days */}
          {days.map((day) => {
            const attendance = attendanceData.find(
              (record) => format(record.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );
            
            const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            
            return (
              <div 
                key={day.toString()}
                className={`h-24 rounded-md border p-1 ${
                  isToday 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-100 dark:border-gray-800'
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className={`text-sm ${isToday ? 'font-bold text-primary' : ''}`}>
                    {format(day, 'd')}
                  </span>
                  {attendance && attendance.status !== 'absent' && (
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${getStatusColor(attendance.status)}`}>
                      {getStatusIcon(attendance.status)}
                    </span>
                  )}
                </div>
                
                {attendance && attendance.status !== 'absent' && (
                  <div className="mt-2 text-xs">
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                      <span>In:</span>
                      <span>{attendance.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                      <span>Out:</span>
                      <span>{attendance.checkOut || '-'}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderListView = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Check In
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Check Out
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Work Hours
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
          {filteredAttendance.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {format(record.date, 'MMMM d, yyyy')}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {record.checkIn || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {record.checkOut || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {record.workHours ? `${record.workHours} hrs` : '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                  <span>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <div className="animate-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Attendance Management
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Track and manage employee attendance records
        </p>
      </header>
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search attendance records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setView('list')}
            className={`btn-sm ${
              view === 'list' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`btn-sm ${
              view === 'calendar' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            <Calendar className="mr-1 h-4 w-4" />
            Calendar
          </button>
          
          <Link to="/attendance/scan" className="btn-secondary btn-sm">
            <QrCode className="mr-1 h-4 w-4" />
            Scan QR
          </Link>
          
          <button
            onClick={handleExportAttendance}
            className="btn-outline btn-sm"
          >
            <Download className="mr-1 h-4 w-4" />
            Export
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Present Days</p>
            <p className="text-2xl font-bold text-primary">21</p>
          </div>
          <div className="rounded-lg bg-error/10 p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent Days</p>
            <p className="text-2xl font-bold text-error">2</p>
          </div>
          <div className="rounded-lg bg-warning/10 p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Late Days</p>
            <p className="text-2xl font-bold text-warning">3</p>
          </div>
          <div className="rounded-lg bg-success/10 p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On Time %</p>
            <p className="text-2xl font-bold text-success">87%</p>
          </div>
        </div>
        
        {view === 'calendar' ? renderCalendarView() : renderListView()}
      </div>
    </div>
  );
};

export default AttendanceManagement;