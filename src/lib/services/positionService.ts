import { supabase } from '../supabase';
import { Position } from '../../types';

export const positionService = {
  /**
   * Get all positions
   */
  async getAll(): Promise<Position[]> {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      department: item.department,
      description: item.description
    }));
  },
  
  /**
   * Get positions by department
   */
  async getByDepartment(department: string): Promise<Position[]> {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .eq('department', department)
      .order('name');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      department: item.department,
      description: item.description
    }));
  },
  
  /**
   * Get position by ID
   */
  async getById(id: string): Promise<Position> {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      department: data.department,
      description: data.description
    };
  },
  
  /**
   * Create a new position
   */
  async create(position: Omit<Position, 'id'>): Promise<Position> {
    const { data, error } = await supabase
      .from('positions')
      .insert({
        name: position.name,
        department: position.department,
        description: position.description
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      department: data.department,
      description: data.description
    };
  },
  
  /**
   * Update a position
   */
  async update(id: string, position: Partial<Position>): Promise<Position> {
    const { data, error } = await supabase
      .from('positions')
      .update({
        name: position.name,
        department: position.department,
        description: position.description
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      department: data.department,
      description: data.description
    };
  },
  
  /**
   * Delete a position
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('positions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
