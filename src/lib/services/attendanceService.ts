import { supabase } from '../supabase';
import { Attendance } from '../../types';
import { format } from 'date-fns';

export const attendanceService = {
  /**
   * Get all attendance records
   */
  async getAll(): Promise<Attendance[]> {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      checkIn: item.check_in,
      checkOut: item.check_out,
      status: item.status,
      notes: item.notes
    }));
  },
  
  /**
   * Get attendance by employee ID
   */
  async getByEmployeeId(employeeId: string): Promise<Attendance[]> {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      checkIn: item.check_in,
      checkOut: item.check_out,
      status: item.status,
      notes: item.notes
    }));
  },
  
  /**
   * Get attendance by date range
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .gte('date', formattedStartDate)
      .lte('date', formattedEndDate)
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      employeeId: item.employee_id,
      date: item.date,
      checkIn: item.check_in,
      checkOut: item.check_out,
      status: item.status,
      notes: item.notes
    }));
  },
  
  /**
   * Check in attendance
   */
  async checkIn(employeeId: string, notes?: string): Promise<Attendance> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const now = new Date().toISOString();
    
    // Check if already checked in today
    const { data: existingData } = await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('date', today)
      .maybeSingle();
    
    if (existingData) {
      throw new Error('Already checked in today');
    }
    
    const { data, error } = await supabase
      .from('attendance')
      .insert({
        employee_id: employeeId,
        date: today,
        check_in: now,
        status: 'present',
        notes: notes || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      checkIn: data.check_in,
      checkOut: data.check_out,
      status: data.status,
      notes: data.notes
    };
  },
  
  /**
   * Check out attendance
   */
  async checkOut(employeeId: string, notes?: string): Promise<Attendance> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const now = new Date().toISOString();
    
    // Find today's attendance record
    const { data: existingData, error: findError } = await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('date', today)
      .maybeSingle();
    
    if (findError) throw findError;
    
    if (!existingData) {
      throw new Error('No check-in record found for today');
    }
    
    if (existingData.check_out) {
      throw new Error('Already checked out today');
    }
    
    const { data, error } = await supabase
      .from('attendance')
      .update({
        check_out: now,
        notes: notes ? (existingData.notes ? `${existingData.notes}; ${notes}` : notes) : existingData.notes
      })
      .eq('id', existingData.id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      checkIn: data.check_in,
      checkOut: data.check_out,
      status: data.status,
      notes: data.notes
    };
  },
  
  /**
   * Update attendance status
   */
  async updateStatus(id: string, status: Attendance['status'], notes?: string): Promise<Attendance> {
    const { data, error } = await supabase
      .from('attendance')
      .update({
        status,
        notes
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      employeeId: data.employee_id,
      date: data.date,
      checkIn: data.check_in,
      checkOut: data.check_out,
      status: data.status,
      notes: data.notes
    };
  },
  
  /**
   * Delete attendance record
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('attendance')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};