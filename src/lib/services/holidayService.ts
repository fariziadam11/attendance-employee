import { supabase } from '../supabase';
import { Holiday } from '../../types';
import { format } from 'date-fns';

export const holidayService = {
  /**
   * Get all holidays
   */
  async getAll(): Promise<Holiday[]> {
    const { data, error } = await supabase
      .from('holidays')
      .select('*')
      .order('date');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      date: item.date,
      type: item.type,
      description: item.description
    }));
  },
  
  /**
   * Get holidays by year
   */
  async getByYear(year: number): Promise<Holiday[]> {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    
    const { data, error } = await supabase
      .from('holidays')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      date: item.date,
      type: item.type,
      description: item.description
    }));
  },
  
  /**
   * Get holidays by month and year
   */
  async getByMonthAndYear(month: number, year: number): Promise<Holiday[]> {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = month === 12 
      ? `${year}-12-31` 
      : `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    
    const { data, error } = await supabase
      .from('holidays')
      .select('*')
      .gte('date', startDate)
      .lt('date', endDate)
      .order('date');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      date: item.date,
      type: item.type,
      description: item.description
    }));
  },
  
  /**
   * Create a new holiday
   */
  async create(holiday: Omit<Holiday, 'id'>): Promise<Holiday> {
    const { data, error } = await supabase
      .from('holidays')
      .insert({
        name: holiday.name,
        date: holiday.date,
        type: holiday.type,
        description: holiday.description
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      date: data.date,
      type: data.type,
      description: data.description
    };
  },
  
  /**
   * Update a holiday
   */
  async update(id: string, holiday: Partial<Holiday>): Promise<Holiday> {
    const { data, error } = await supabase
      .from('holidays')
      .update({
        name: holiday.name,
        date: holiday.date,
        type: holiday.type,
        description: holiday.description
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      date: data.date,
      type: data.type,
      description: data.description
    };
  },
  
  /**
   * Delete a holiday
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('holidays')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
  
  /**
   * Check if a date is a holiday
   */
  async isHoliday(date: Date): Promise<boolean> {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('holidays')
      .select('id')
      .eq('date', formattedDate)
      .maybeSingle();
    
    if (error) throw error;
    
    return !!data;
  }
};
