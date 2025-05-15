import { supabase } from '../supabase';
import { Employee } from '../../types';

export const employeeService = {
  /**
   * Get all employees
   */
  async getAll(): Promise<Employee[]> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      userId: item.user_id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      department: item.department,
      position: item.position,
      joiningDate: item.joining_date,
      salary: item.salary,
      status: item.status,
      profileImage: item.profile_image
    }));
  },
  
  /**
   * Get employee by ID
   */
  async getById(id: string): Promise<Employee> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      position: data.position,
      joiningDate: data.joining_date,
      salary: data.salary,
      status: data.status,
      profileImage: data.profile_image
    };
  },
  
  /**
   * Create a new employee
   */
  async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const { data, error } = await supabase
      .from('employees')
      .insert({
        user_id: employee.userId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        joining_date: employee.joiningDate,
        salary: employee.salary,
        status: employee.status,
        profile_image: employee.profileImage
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      position: data.position,
      joiningDate: data.joining_date,
      salary: data.salary,
      status: data.status,
      profileImage: data.profile_image
    };
  },
  
  /**
   * Update an employee
   */
  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const { data, error } = await supabase
      .from('employees')
      .update({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        joining_date: employee.joiningDate,
        salary: employee.salary,
        status: employee.status,
        profile_image: employee.profileImage
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      position: data.position,
      joiningDate: data.joining_date,
      salary: data.salary,
      status: data.status,
      profileImage: data.profile_image
    };
  },
  
  /**
   * Delete an employee
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};