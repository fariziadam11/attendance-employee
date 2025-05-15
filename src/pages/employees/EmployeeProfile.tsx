import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Settings, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
  joinDate: string;
  profileImage?: string;
}

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch employee data
    const fetchEmployee = async () => {
      try {
        // In a real application, this would be an API call
        // For now, using mock data
        const mockEmployee: Employee = {
          id: id || '1',
          name: 'John Doe',
          email: 'john.doe@company.com',
          phone: '+1 (555) 123-4567',
          address: '123 Business Street, Corporate City, 12345',
          department: 'Engineering',
          position: 'Senior Developer',
          joinDate: '2022-01-15',
          profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
        };
        
        setEmployee(mockEmployee);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-600">Employee not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-8">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white dark:border-gray-700">
              {employee.profileImage ? (
                <img
                  src={employee.profileImage}
                  alt={employee.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-600">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 pt-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{employee.position}</p>

          {/* Information Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{employee.address}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{employee.department}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Joined {new Date(employee.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">Employee ID: {employee.id}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Edit Profile
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              View Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;