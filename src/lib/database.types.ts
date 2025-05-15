export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          role: 'admin' | 'employee'
          profile_image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          role?: 'admin' | 'employee'
          profile_image?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'admin' | 'employee'
          profile_image?: string | null
        }
      }
      employees: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          email: string
          phone: string
          department: string
          position: string
          joining_date: string
          salary: number
          status: 'active' | 'inactive'
          profile_image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          email: string
          phone: string
          department: string
          position: string
          joining_date: string
          salary: number
          status?: 'active' | 'inactive'
          profile_image?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          department?: string
          position?: string
          joining_date?: string
          salary?: number
          status?: 'active' | 'inactive'
          profile_image?: string | null
        }
      }
      attendance: {
        Row: {
          id: string
          created_at: string
          employee_id: string
          date: string
          check_in: string
          check_out: string | null
          status: 'present' | 'absent' | 'half-day' | 'late'
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          employee_id: string
          date: string
          check_in: string
          check_out?: string | null
          status: 'present' | 'absent' | 'half-day' | 'late'
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          employee_id?: string
          date?: string
          check_in?: string
          check_out?: string | null
          status?: 'present' | 'absent' | 'half-day' | 'late'
          notes?: string | null
        }
      }
      leave_requests: {
        Row: {
          id: string
          created_at: string
          employee_id: string
          start_date: string
          end_date: string
          type: 'sick' | 'casual' | 'annual' | 'unpaid' | 'other'
          reason: string
          status: 'pending' | 'approved' | 'rejected'
          approved_by: string | null
          approved_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          employee_id: string
          start_date: string
          end_date: string
          type: 'sick' | 'casual' | 'annual' | 'unpaid' | 'other'
          reason: string
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string | null
          approved_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          employee_id?: string
          start_date?: string
          end_date?: string
          type?: 'sick' | 'casual' | 'annual' | 'unpaid' | 'other'
          reason?: string
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string | null
          approved_at?: string | null
          notes?: string | null
        }
      }
      holidays: {
        Row: {
          id: string
          created_at: string
          name: string
          date: string
          type: 'public' | 'company'
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          date: string
          type: 'public' | 'company'
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          date?: string
          type?: 'public' | 'company'
          description?: string | null
        }
      }
      overtime: {
        Row: {
          id: string
          created_at: string
          employee_id: string
          date: string
          hours: number
          rate: number
          approved: boolean
          approved_by: string | null
          approved_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          employee_id: string
          date: string
          hours: number
          rate: number
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          employee_id?: string
          date?: string
          hours?: number
          rate?: number
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
        }
      }
      salaries: {
        Row: {
          id: string
          created_at: string
          employee_id: string
          month: number
          year: number
          basic_salary: number
          overtime_amount: number
          bonus: number
          deductions: number
          total_amount: number
          status: 'pending' | 'paid'
          paid_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          employee_id: string
          month: number
          year: number
          basic_salary: number
          overtime_amount: number
          bonus: number
          deductions: number
          total_amount: number
          status?: 'pending' | 'paid'
          paid_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          employee_id?: string
          month?: number
          year?: number
          basic_salary?: number
          overtime_amount?: number
          bonus?: number
          deductions?: number
          total_amount?: number
          status?: 'pending' | 'paid'
          paid_at?: string | null
        }
      }
      departments: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
        }
      }
      positions: {
        Row: {
          id: string
          created_at: string
          name: string
          department: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          department: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          department?: string
          description?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
