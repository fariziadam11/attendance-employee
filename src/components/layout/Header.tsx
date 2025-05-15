import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleTheme, theme }) => {
  const { user, logout } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <button
        onClick={toggleSidebar}
        className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 md:hidden"
      >
        <Menu size={24} />
      </button>
      
      <div className="hidden md:block">
        <Link to="/" className="text-xl font-bold text-primary">
          EMS Portal
        </Link>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <Bell size={20} />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
              3
            </span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right animate-in rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
              <div className="mb-2 px-4 py-2">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="mb-2 cursor-pointer rounded-md px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <p className="text-sm font-medium">New leave request</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Sarah Johnson requested sick leave
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t border-gray-100 px-4 py-2 dark:border-gray-700">
                <button className="w-full text-center text-sm font-medium text-primary">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={user?.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDown size={16} className="ml-1 text-gray-500 dark:text-gray-400" />
            </div>
          </button>
          
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right animate-in rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                <div className="mt-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {user?.role === 'admin' ? 'Administrator' : 'Employee'}
                </div>
              </div>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => setProfileDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setProfileDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;