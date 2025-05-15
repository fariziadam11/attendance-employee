import React from 'react';

const EmployeeList = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Directory</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Manage and view all employees in the organization</p>
      </div>

      {/* Placeholder for employee list - to be implemented */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500 dark:text-gray-400">Employee list will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;