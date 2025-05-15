import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Clock, CalendarCheck, UserCheck, CreditCard, 
  ArrowRight, Users, UserPlus, BarChart4
} from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import AttendanceChart from '../../components/dashboard/AttendanceChart';
import RecentLeaveRequests from '../../components/dashboard/RecentLeaveRequests';
import UpcomingHolidays from '../../components/dashboard/UpcomingHolidays';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="animate-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-green-400">
          Welcome back, {user?.name}
        </p>
      </header>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-primary/90 to-primary p-6 text-white">
        <div>
          <h2 className="text-2xl font-bold">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </h2>
          <p className="text-3xl font-bold tracking-wide">
            {format(currentTime, 'h:mm:ss a')}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/attendance/scan" className="btn-md rounded-lg bg-white text-primary hover:bg-white/90">
            Check In/Out
          </Link>
          <Link to="/leave" className="btn-md rounded-lg bg-white/20 text-white hover:bg-white/30">
            Request Leave
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isAdmin ? (
          <>
            <StatsCard 
              title="Total Employees" 
              value="28" 
              icon={<Users className="h-6 w-6 text-primary" />} 
              change="+3" 
              changeText="since last month" 
              changeTrend="up" 
            />
            <StatsCard 
              title="Attendance Today" 
              value="24" 
              icon={<UserCheck className="h-6 w-6 text-success" />} 
              change="86%" 
              changeText="of total employees" 
              changeTrend="neutral" 
            />
            <StatsCard 
              title="Pending Leaves" 
              value="5" 
              icon={<CalendarCheck className="h-6 w-6 text-warning" />} 
              change="+2" 
              changeText="since yesterday" 
              changeTrend="up" 
            />
            <StatsCard 
              title="Overtime Hours" 
              value="48" 
              icon={<Clock className="h-6 w-6 text-accent" />} 
              change="+12" 
              changeText="this week" 
              changeTrend="up" 
            />
          </>
        ) : (
          <>
            <StatsCard 
              title="Attendance" 
              value="18" 
              icon={<UserCheck className="h-6 w-6 text-success" />} 
              change="90%" 
              changeText="this month" 
              changeTrend="up" 
            />
            <StatsCard 
              title="Leave Balance" 
              value="12" 
              icon={<CalendarCheck className="h-6 w-6 text-warning" />} 
              change="days" 
              changeText="remaining" 
              changeTrend="neutral" 
            />
            <StatsCard 
              title="Overtime" 
              value="8" 
              icon={<Clock className="h-6 w-6 text-accent" />} 
              change="+2" 
              changeText="this month" 
              changeTrend="up" 
            />
            <StatsCard 
              title="Next Salary" 
              value="$3,200" 
              icon={<CreditCard className="h-6 w-6 text-primary" />} 
              change="in 8 days" 
              changeText="Jul 30, 2025" 
              changeTrend="neutral" 
            />
          </>
        )}
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Attendance Overview</h3>
              <select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
              </select>
            </div>
            <AttendanceChart />
          </div>
          
          {isAdmin && (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10">
                <UserPlus className="mb-2 h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">New Employee</h3>
                <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Add a new employee to the system
                </p>
                <Link to="/employees" className="flex items-center text-sm font-medium text-primary hover:underline">
                  <span>Add employee</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="card bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-900/10">
                <CalendarCheck className="mb-2 h-8 w-8 text-success" />
                <h3 className="text-lg font-semibold">Approve Leaves</h3>
                <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Review pending leave requests
                </p>
                <Link to="/leave/requests" className="flex items-center text-sm font-medium text-success hover:underline">
                  <span>View requests</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="card bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-900/10">
                <BarChart4 className="mb-2 h-8 w-8 text-accent" />
                <h3 className="text-lg font-semibold">Reports</h3>
                <p className="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Generate attendance & salary reports
                </p>
                <Link to="/reports" className="flex items-center text-sm font-medium text-accent hover:underline">
                  <span>View reports</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-1 space-y-6">
          <RecentLeaveRequests />
          <UpcomingHolidays />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;