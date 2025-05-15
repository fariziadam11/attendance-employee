# Employee Attendance System with Supabase

A complete employee attendance management system built with React and Supabase, featuring authentication, attendance tracking, leave management, salary processing, and more.

## Features

- **Authentication**: Secure login and registration with Supabase Auth
- **Employee Management**: Add, edit, and manage employee profiles
- **Attendance Tracking**: Track check-ins and check-outs with QR code support
- **Leave Management**: Request and approve leave applications
- **Salary Management**: Process and track employee salaries
- **Overtime Tracking**: Record and approve overtime hours
- **Holiday Calendar**: Manage company holidays
- **Reports**: Generate attendance and payroll reports
- **Dark/Light Mode**: Support for theme preferences

## Tech Stack

- React with TypeScript
- Supabase for backend (Auth, Database, Storage)
- TailwindCSS for styling
- React Router for navigation
- Zustand for state management
- React Hook Form for form handling
- Chart.js for data visualization
- jsPDF for report generation

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account

### Supabase Setup

1. Create a new Supabase project
2. Set up the database schema:
   - Navigate to the SQL Editor in your Supabase dashboard
   - Run the SQL script from `supabase/migrations/20250515_initial_schema.sql`
3. Get your Supabase URL and anon key from the project settings

### Environment Setup

1. Create a `.env` file in the project root with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

### Authentication

The system comes with two default users:
- Admin: admin@company.com / admin123
- Employee: employee@company.com / employee123

You can register new users through the registration page.

### Employee Management

Admins can:
- Add new employees
- Edit employee details
- Deactivate/activate employees

### Attendance Management

- Employees can check in/out using the QR scanner
- Admins can generate QR codes for attendance
- View attendance records and reports

### Leave Management

- Employees can request leave
- Admins can approve/reject leave requests
- Track leave balances

### Salary Management

- Calculate salaries based on attendance and overtime
- Process monthly payroll
- Generate salary slips

## Database Schema

The Supabase database includes the following tables:
- users
- employees
- attendance
- leave_requests
- holidays
- overtime
- salaries
- departments
- positions

## API Services

The application includes service modules for each feature:
- Authentication service
- Employee service
- Attendance service
- Leave service
- Salary service
- Overtime service
- Holiday service
- Department service
- Position service

## License

MIT
