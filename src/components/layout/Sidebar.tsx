import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, ClipboardCheck, Users, Calendar, CreditCard, 
  Clock, BarChart, Settings, X, UserCheck
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    ...(isAdmin ? [{ name: 'Employees', path: '/employees', icon: <Users size={20} /> }] : []),
    { name: 'Attendance', path: '/attendance', icon: <ClipboardCheck size={20} /> },
    { name: 'Leave Management', path: '/leave', icon: <Calendar size={20} /> },
    ...(isAdmin ? [{ name: 'Leave Requests', path: '/leave/requests', icon: <UserCheck size={20} /> }] : []),
    { name: 'Salary', path: '/salary', icon: <CreditCard size={20} /> },
    { name: 'Overtime', path: '/overtime', icon: <Clock size={20} /> },
    { name: 'Holidays', path: '/holidays', icon: <Calendar size={20} /> },
    ...(isAdmin ? [{ name: 'Reports', path: '/reports', icon: <BarChart size={20} /> }] : []),
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white pt-5 transition-transform dark:border-gray-800 dark:bg-gray-800 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4">
          <span className="text-xl font-bold text-primary">
            EMS Portal
          </span>
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src={user?.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg'}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role === 'admin' ? 'Administrator' : 'Employee'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;