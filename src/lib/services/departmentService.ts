import { supabase } from '../supabase';
import { Department } from '../../types';

export const departmentService = {
  /**
   * Get all departments
   */
  async getAll(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description
    }));
  },
  
  /**
   * Get department by ID
   */
  async getById(id: string): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description
    };
  },
  
  /**
   * Create a new department
   */
  async create(department: Omit<Department, 'id'>): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .insert({
        name: department.name,
        description: department.description
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description
    };
  },
  
  /**
   * Update a department
   */
  async update(id: string, department: Partial<Department>): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .update({
        name: department.name,
        description: department.description
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description
    };
  },
  
  /**
   * Delete a department
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('departments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
