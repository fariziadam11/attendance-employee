import React from 'react';

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Report</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">View and export detailed attendance records</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Generate Report
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave Report</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Analyze leave patterns and statistics</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Generate Report
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payroll Report</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Access salary and compensation reports</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;