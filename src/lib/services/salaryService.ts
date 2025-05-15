import { supabase } from '../supabase';
import { Salary } from '../../types';

export const salaryService = {
  /**
   * Get all salary records
   */
  async getAll(): Promise<Salary[]> {
    const { data, error } = await supabase
      .from('salaries')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      month: item.month,
      year: item.year,
      basicSalary: item.basic_salary,
      overtimeAmount: item.overtime_amount,
      bonus: item.bonus,
      deductions: item.deductions,
      totalAmount: item.total_amount,
      status: item.status,
      paidAt: item.paid_at
    }));
  },
  
  /**
   * Get salary records by employee ID
   */
  async getByEmployeeId(employeeId: string): Promise<Salary[]> {
    const { data, error } = await supabase
      .from('salaries')
      .select('*')
      .eq('employee_id', employeeId)
      .order('year', { ascending: false })
      .order('month', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      month: item.month,
      year: item.year,
      basicSalary: item.basic_salary,
      overtimeAmount: item.overtime_amount,
      bonus: item.bonus,
      deductions: item.deductions,
      totalAmount: item.total_amount,
      status: item.status,
      paidAt: item.paid_at
    }));
  },
  
  /**
   * Get salary by ID
   */
  async getById(id: string): Promise<Salary> {
    const { data, error } = await supabase
      .from('salaries')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      month: data.month,
      year: data.year,
      basicSalary: data.basic_salary,
      overtimeAmount: data.overtime_amount,
      bonus: data.bonus,
      deductions: data.deductions,
      totalAmount: data.total_amount,
      status: data.status,
      paidAt: data.paid_at
    };
  },
  
  /**
   * Create a new salary record
   */
  async create(salary: Omit<Salary, 'id' | 'status' | 'paidAt'>): Promise<Salary> {
    // Calculate total amount
    const totalAmount = 
      salary.basicSalary + 
      salary.overtimeAmount + 
      salary.bonus - 
      salary.deductions;
    
    const { data, error } = await supabase
      .from('salaries')
      .insert({
        employee_id: salary.employeeId,
        month: salary.month,
        year: salary.year,
        basic_salary: salary.basicSalary,
        overtime_amount: salary.overtimeAmount,
        bonus: salary.bonus,
        deductions: salary.deductions,
        total_amount: totalAmount,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      month: data.month,
      year: data.year,
      basicSalary: data.basic_salary,
      overtimeAmount: data.overtime_amount,
      bonus: data.bonus,
      deductions: data.deductions,
      totalAmount: data.total_amount,
      status: data.status,
      paidAt: data.paid_at
    };
  },
  
  /**
   * Update a salary record
   */
  async update(id: string, salary: Partial<Omit<Salary, 'id' | 'status' | 'paidAt'>>): Promise<Salary> {
    // Get current salary record
    const { data: currentData, error: fetchError } = await supabase
      .from('salaries')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Calculate new total amount
    const basicSalary = salary.basicSalary ?? currentData.basic_salary;
    const overtimeAmount = salary.overtimeAmount ?? currentData.overtime_amount;
    const bonus = salary.bonus ?? currentData.bonus;
    const deductions = salary.deductions ?? currentData.deductions;
    
    const totalAmount = basicSalary + overtimeAmount + bonus - deductions;
    
    const { data, error } = await supabase
      .from('salaries')
      .update({
        basic_salary: basicSalary,
        overtime_amount: overtimeAmount,
        bonus: bonus,
        deductions: deductions,
        total_amount: totalAmount
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      month: data.month,
      year: data.year,
      basicSalary: data.basic_salary,
      overtimeAmount: data.overtime_amount,
      bonus: data.bonus,
      deductions: data.deductions,
      totalAmount: data.total_amount,
      status: data.status,
      paidAt: data.paid_at
    };
  },
  
  /**
   * Mark salary as paid
   */
  async markAsPaid(id: string): Promise<Salary> {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('salaries')
      .update({
        status: 'paid',
        paid_at: now
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      month: data.month,
      year: data.year,
      basicSalary: data.basic_salary,
      overtimeAmount: data.overtime_amount,
      bonus: data.bonus,
      deductions: data.deductions,
      totalAmount: data.total_amount,
      status: data.status,
      paidAt: data.paid_at
    };
  },
  
  /**
   * Delete a salary record
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('salaries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};