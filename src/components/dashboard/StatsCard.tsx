import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeText: string;
  changeTrend: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeText,
  changeTrend,
}) => {
  return (
    <div className="card transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <div className="mt-2 flex items-center">
        {changeTrend === 'up' && (
          <ArrowUp className="mr-1 h-4 w-4 text-success" />
        )}
        {changeTrend === 'down' && (
          <ArrowDown className="mr-1 h-4 w-4 text-error" />
        )}
        {changeTrend === 'neutral' && (
          <Minus className="mr-1 h-4 w-4 text-gray-500" />
        )}
        <span className={`text-sm font-medium ${
          changeTrend === 'up' ? 'text-success' : 
          changeTrend === 'down' ? 'text-error' : 
          'text-gray-500'
        }`}>
          {change}
        </span>
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{changeText}</span>
      </div>
    </div>
  );
};

export default StatsCard;