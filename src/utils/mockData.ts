import { format, addDays, subDays } from 'date-fns';

// Mock data generators for demo purposes
export const initializeMockData = () => {
  // Mock employees
  const employees = [
    {
      id: 'emp-1',
      userId: 'admin-id',
      name: 'Admin User',
      email: 'admin@company.com',
      phone: '555-123-4567',
      department: 'Management',
      position: 'HR Director',
      joiningDate: '2020-06-15',
      salary: 5500,
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'emp-2',
      userId: 'employee-id',
      name: 'John Employee',
      email: 'employee@company.com',
      phone: '555-987-6543',
      department: 'Engineering',
      position: 'Software Developer',
      joiningDate: '2021-03-10',
      salary: 3200,
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    {
      id: 'emp-3',
      userId: 'user-3',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      phone: '555-345-6789',
      department: 'Marketing',
      position: 'Marketing Specialist',
      joiningDate: '2022-01-05',
      salary: 2800,
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
  ];

  // Store mock data in localStorage
  localStorage.setItem('mockEmployees', JSON.stringify(employees));
  
  // Additional mock data can be initialized here
  // This is primarily for demo purposes, in a real app this would come from a backend
};

export const getEmployees = () => {
  const storedEmployees = localStorage.getItem('mockEmployees');
  return storedEmployees ? JSON.parse(storedEmployees) : [];
};

export const getHolidays = () => {
  return [
    {
      id: '1',
      name: 'Independence Day',
      date: '2025-07-04',
      type: 'public',
      description: 'National holiday celebrating independence',
    },
    {
      id: '2',
      name: 'Company Foundation Day',
      date: '2025-07-15',
      type: 'company',
      description: 'Celebrating our company anniversary',
    },
    {
      id: '3',
      name: 'Labor Day',
      date: '2025-09-01',
      type: 'public',
      description: 'Honoring the American labor movement',
    },
  ];
};

export const getLeaveRequests = () => {
  return [
    {
      id: '1',
      employeeId: 'emp-3',
      employeeName: 'Sarah Johnson',
      startDate: '2025-07-20',
      endDate: '2025-07-21',
      type: 'sick',
      reason: 'Feeling unwell, need to rest and recover',
      status: 'pending',
      createdAt: '2025-07-18T10:30:00',
    },
    {
      id: '2',
      employeeId: 'emp-2',
      employeeName: 'John Employee',
      startDate: '2025-08-05',
      endDate: '2025-08-10',
      type: 'annual',
      reason: 'Family vacation',
      status: 'approved',
      approvedBy: 'Admin User',
      approvedAt: '2025-07-15T14:20:00',
    },
    {
      id: '3',
      employeeId: 'emp-2',
      employeeName: 'John Employee',
      startDate: '2025-07-25',
      endDate: '2025-07-25',
      type: 'unpaid',
      reason: 'Personal matters',
      status: 'rejected',
      approvedBy: 'Admin User',
      approvedAt: '2025-07-20T11:15:00',
      notes: 'High workload and deadline approaching',
    },
  ];
};

export const getSalaryData = () => {
  return [
    {
      id: 'sal-1',
      employeeId: 'emp-1',
      month: 6,
      year: 2025,
      basicSalary: 5500,
      overtimeAmount: 250,
      bonus: 500,
      deductions: 200,
      totalAmount: 6050,
      status: 'paid',
      paidAt: '2025-06-30T15:00:00',
    },
    {
      id: 'sal-2',
      employeeId: 'emp-2',
      month: 6,
      year: 2025,
      basicSalary: 3200,
      overtimeAmount: 180,
      bonus: 0,
      deductions: 100,
      totalAmount: 3280,
      status: 'paid',
      paidAt: '2025-06-30T15:00:00',
    },
    {
      id: 'sal-3',
      employeeId: 'emp-3',
      month: 6,
      year: 2025,
      basicSalary: 2800,
      overtimeAmount: 0,
      bonus: 200,
      deductions: 80,
      totalAmount: 2920,
      status: 'paid',
      paidAt: '2025-06-30T15:00:00',
    },
    {
      id: 'sal-4',
      employeeId: 'emp-1',
      month: 7,
      year: 2025,
      basicSalary: 5500,
      overtimeAmount: 0,
      bonus: 0,
      deductions: 200,
      totalAmount: 5300,
      status: 'pending',
    },
    {
      id: 'sal-5',
      employeeId: 'emp-2',
      month: 7,
      year: 2025,
      basicSalary: 3200,
      overtimeAmount: 240,
      bonus: 0,
      deductions: 100,
      totalAmount: 3340,
      status: 'pending',
    },
    {
      id: 'sal-6',
      employeeId: 'emp-3',
      month: 7,
      year: 2025,
      basicSalary: 2800,
      overtimeAmount: 120,
      bonus: 0,
      deductions: 80,
      totalAmount: 2840,
      status: 'pending',
    },
  ];
};