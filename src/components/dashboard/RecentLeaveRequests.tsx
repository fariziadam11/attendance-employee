import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const leaveRequests = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    type: 'sick',
    startDate: '2025-07-20',
    endDate: '2025-07-21',
    status: 'pending',
  },
  {
    id: '2',
    employeeName: 'Michael Chen',
    type: 'annual',
    startDate: '2025-08-05',
    endDate: '2025-08-10',
    status: 'approved',
  },
  {
    id: '3',
    employeeName: 'David Williams',
    type: 'unpaid',
    startDate: '2025-07-25',
    endDate: '2025-07-25',
    status: 'rejected',
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-warning/10 text-warning';
    case 'approved':
      return 'bg-success/10 text-success';
    case 'rejected':
      return 'bg-error/10 text-error';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getLeaveTypeLabel = (type: string) => {
  switch (type) {
    case 'sick':
      return 'Sick Leave';
    case 'annual':
      return 'Annual Leave';
    case 'casual':
      return 'Casual Leave';
    case 'unpaid':
      return 'Unpaid Leave';
    default:
      return 'Other';
  }
};

const RecentLeaveRequests: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isAdmin ? 'Recent Leave Requests' : 'Your Leave Requests'}
        </h3>
        <Link
          to={isAdmin ? '/leave/requests' : '/leave'}
          className="flex items-center text-sm font-medium text-primary hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((request) => (
            <div key={request.id} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100">{request.employeeName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getLeaveTypeLabel(request.type)}: {request.startDate} to {request.endDate}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">No leave requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentLeaveRequests;