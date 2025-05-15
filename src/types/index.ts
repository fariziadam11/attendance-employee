export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  profileImage?: string;
}

export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive';
  profileImage?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'absent' | 'half-day' | 'late';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'casual' | 'annual' | 'unpaid' | 'other';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'company';
  description?: string;
}

export interface Overtime {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  rate: number;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Salary {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  overtimeAmount: number;
  bonus: number;
  deductions: number;
  totalAmount: number;
  status: 'pending' | 'paid';
  paidAt?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface Position {
  id: string;
  name: string;
  department: string;
  description?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: 'admin' | 'employee') => Promise<{ success: boolean; error?: unknown }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string | unknown }>;
}