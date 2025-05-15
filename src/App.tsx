import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeProfile from './pages/employees/EmployeeProfile';
import AttendanceManagement from './pages/attendance/AttendanceManagement';
import QRScanner from './pages/attendance/QRScanner';
import QRGenerator from './pages/attendance/QRGenerator';
import LeaveManagement from './pages/leave/LeaveManagement';
import LeaveRequests from './pages/leave/LeaveRequests';
import SalaryManagement from './pages/salary/SalaryManagement';
import SalaryDetails from './pages/salary/SalaryDetails';
import HolidayCalendar from './pages/holiday/HolidayCalendar';
import Reports from './pages/reports/Reports';
import OvertimeTracking from './pages/overtime/OvertimeTracking';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Check for existing Supabase session on app load
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            color: theme === 'dark' ? '#F9FAFB' : '#111827',
          }
        }}
      />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout toggleTheme={toggleTheme} theme={theme} />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
          <Route path="employees/:id" element={<EmployeeProfile />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="attendance/scan" element={<QRScanner />} />
          <Route path="attendance/qr" element={<AdminRoute><QRGenerator /></AdminRoute>} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="leave/requests" element={<AdminRoute><LeaveRequests /></AdminRoute>} />
          <Route path="salary" element={<SalaryManagement />} />
          <Route path="salary/:id" element={<SalaryDetails />} />
          <Route path="overtime" element={<OvertimeTracking />} />
          <Route path="holidays" element={<HolidayCalendar />} />
          <Route path="reports" element={<AdminRoute><Reports /></AdminRoute>} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;