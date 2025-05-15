import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const holidays = [
  {
    id: '1',
    name: 'Independence Day',
    date: '2025-07-04',
    type: 'public',
  },
  {
    id: '2',
    name: 'Company Foundation Day',
    date: '2025-07-15',
    type: 'company',
  },
  {
    id: '3',
    name: 'Labor Day',
    date: '2025-09-01',
    type: 'public',
  },
];

const getHolidayTypeClass = (type: string) => {
  return type === 'public' 
    ? 'bg-accent/10 text-accent' 
    : 'bg-secondary/10 text-secondary';
};

const UpcomingHolidays: React.FC = () => {
  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upcoming Holidays</h3>
        <Link
          to="/holidays"
          className="flex items-center text-sm font-medium text-primary hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {holidays.length > 0 ? (
          holidays.map((holiday) => (
            <div key={holiday.id} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100">{holiday.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{holiday.date}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHolidayTypeClass(holiday.type)}`}>
                {holiday.type === 'public' ? 'Public' : 'Company'}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming holidays</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingHolidays;