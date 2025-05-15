import React from 'react';
import { Calendar } from 'lucide-react';

const HolidayCalendar: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Holiday Calendar</h1>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">2024 Calendar</span>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {months.map((month, index) => (
            <div key={index} className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">{month.name}</h3>
              <ul className="space-y-2">
                {month.holidays.map((holiday, holidayIndex) => (
                  <li 
                    key={holidayIndex}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-2 dark:bg-gray-700"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {holiday.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {holiday.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample holiday data
const months = [
  {
    name: 'January',
    holidays: [
      { name: 'New Year\'s Day', date: 'Jan 1' },
      { name: 'Martin Luther King Jr. Day', date: 'Jan 15' }
    ]
  },
  {
    name: 'February',
    holidays: [
      { name: 'Presidents\' Day', date: 'Feb 19' }
    ]
  },
  {
    name: 'March',
    holidays: [
      { name: 'Good Friday', date: 'Mar 29' }
    ]
  },
  {
    name: 'April',
    holidays: [
      { name: 'Easter Monday', date: 'Apr 1' }
    ]
  },
  {
    name: 'May',
    holidays: [
      { name: 'Memorial Day', date: 'May 27' }
    ]
  },
  {
    name: 'June',
    holidays: [
      { name: 'Juneteenth', date: 'Jun 19' }
    ]
  },
  {
    name: 'July',
    holidays: [
      { name: 'Independence Day', date: 'Jul 4' }
    ]
  },
  {
    name: 'August',
    holidays: []
  },
  {
    name: 'September',
    holidays: [
      { name: 'Labor Day', date: 'Sep 2' }
    ]
  },
  {
    name: 'October',
    holidays: [
      { name: 'Columbus Day', date: 'Oct 14' }
    ]
  },
  {
    name: 'November',
    holidays: [
      { name: 'Veterans Day', date: 'Nov 11' },
      { name: 'Thanksgiving Day', date: 'Nov 28' }
    ]
  },
  {
    name: 'December',
    holidays: [
      { name: 'Christmas Eve', date: 'Dec 24' },
      { name: 'Christmas Day', date: 'Dec 25' },
      { name: 'New Year\'s Eve', date: 'Dec 31' }
    ]
  }
];

export default HolidayCalendar;