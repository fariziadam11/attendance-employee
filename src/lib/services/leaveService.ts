import { supabase } from '../supabase';
import { LeaveRequest } from '../../types';

export const leaveService = {
  /**
   * Get all leave requests
   */
  async getAll(): Promise<LeaveRequest[]> {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      startDate: item.start_date,
      endDate: item.end_date,
      type: item.type,
      reason: item.reason,
      status: item.status,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at,
      notes: item.notes
    }));
  },
  
  /**
   * Get leave requests by employee ID
   */
  async getByEmployeeId(employeeId: string): Promise<LeaveRequest[]> {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('employee_id', employeeId)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      startDate: item.start_date,
      endDate: item.end_date,
      type: item.type,
      reason: item.reason,
      status: item.status,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at,
      notes: item.notes
    }));
  },
  
  /**
   * Get leave requests by status
   */
  async getByStatus(status: LeaveRequest['status']): Promise<LeaveRequest[]> {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('status', status)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      startDate: item.start_date,
      endDate: item.end_date,
      type: item.type,
      reason: item.reason,
      status: item.status,
      approvedBy: item.approved_by,
      approvedAt: item.approved_at,
      notes: item.notes
    }));
  },
  
  /**
   * Create a new leave request
   */
  async create(leaveRequest: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvedAt'>): Promise<LeaveRequest> {
    const { data, error } = await supabase
      .from('leave_requests')
      .insert({
        employee_id: leaveRequest.employeeId,
        start_date: leaveRequest.startDate,
        end_date: leaveRequest.endDate,
        type: leaveRequest.type,
        reason: leaveRequest.reason,
        status: 'pending',
        notes: leaveRequest.notes
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      startDate: data.start_date,
      endDate: data.end_date,
      type: data.type,
      reason: data.reason,
      status: data.status,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at,
      notes: data.notes
    };
  },
  
  /**
   * Update leave request status
   */
  async updateStatus(
    id: string, 
    status: LeaveRequest['status'], 
    approvedBy?: string, 
    notes?: string
  ): Promise<LeaveRequest> {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('leave_requests')
      .update({
        status,
        approved_by: status !== 'pending' ? approvedBy : null,
        approved_at: status !== 'pending' ? now : null,
        notes
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      startDate: data.start_date,
      endDate: data.end_date,
      type: data.type,
      reason: data.reason,
      status: data.status,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at,
      notes: data.notes
    };
  },
  
  /**
   * Delete a leave request
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('leave_requests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};