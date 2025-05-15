import React, { useState } from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

const LeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Leave Balance</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">15 days</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Annual leave remaining</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Pending Requests</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveRequests.filter(r => r.status === 'pending').length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Awaiting approval</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Total Requests</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveRequests.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">This year</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leave History</h2>
          {leaveRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Start Date</th>
                    <th className="text-left py-3 px-4">End Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4">{request.type}</td>
                      <td className="py-3 px-4">{request.startDate}</td>
                      <td className="py-3 px-4">{request.endDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">{request.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No leave requests found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;