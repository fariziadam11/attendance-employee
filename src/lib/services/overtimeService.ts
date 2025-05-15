import { supabase } from '../supabase';
import { Overtime } from '../../types';

export const overtimeService = {
  /**
   * Get all overtime records
   */
  async getAll(): Promise<Overtime[]> {
    const { data, error } = await supabase
      .from('overtime')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      hours: item.hours,
      rate: item.rate,
      approved: item.approved,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at
    }));
  },
  
  /**
   * Get overtime records by employee ID
   */
  async getByEmployeeId(employeeId: string): Promise<Overtime[]> {
    const { data, error } = await supabase
      .from('overtime')
      .select('*')
      .eq('employee_id', employeeId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      hours: item.hours,
      rate: item.rate,
      approved: item.approved,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at
    }));
  },
  
  /**
   * Get overtime by approval status
   */
  async getByApprovalStatus(approved: boolean): Promise<Overtime[]> {
    const { data, error } = await supabase
      .from('overtime')
      .select('*')
      .eq('approved', approved)
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      hours: item.hours,
      rate: item.rate,
      approved: item.approved,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at
    }));
  },
  
  /**
   * Create a new overtime record
   */
  async create(overtime: Omit<Overtime, 'id' | 'approved' | 'approvedBy' | 'approvedAt'>): Promise<Overtime> {
    const { data, error } = await supabase
      .from('overtime')
      .insert({
        employee_id: overtime.employeeId,
        date: overtime.date,
        hours: overtime.hours,
        rate: overtime.rate,
        approved: false
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      hours: data.hours,
      rate: data.rate,
      approved: data.approved,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at
    };
  },
  
  /**
   * Approve overtime
   */
  async approve(id: string, approvedBy: string): Promise<Overtime> {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('overtime')
      .update({
        approved: true,
        approved_by: approvedBy,
        approved_at: now
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      hours: data.hours,
      rate: data.rate,
      approved: data.approved,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at
    };
  },
  
  /**
   * Update overtime record
   */
  async update(id: string, overtime: Partial<Overtime>): Promise<Overtime> {
    const { data, error } = await supabase
      .from('overtime')
      .update({
        hours: overtime.hours,
        rate: overtime.rate
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      hours: data.hours,
      rate: data.rate,
      approved: data.approved,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at
    };
  },
  
  /**
   * Delete overtime record
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('overtime')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
