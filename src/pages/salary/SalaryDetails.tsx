import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Download, Printer } from 'lucide-react';

interface SalaryDetail {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
  paymentDate?: string;
}

const SalaryDetails: React.FC = () => {
  const { id } = useParams();
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch salary details
    const fetchSalaryDetails = async () => {
      try {
        // Mock data for demonstration
        const mockData: SalaryDetail = {
          id: id || '1',
          month: 'January',
          year: 2025,
          basicSalary: 50000,
          overtime: 2500,
          bonus: 1000,
          deductions: 3000,
          netSalary: 50500,
          status: 'Paid',
          paymentDate: '2025-01-31'
        };
        
        setSalaryDetails(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching salary details:', error);
        setLoading(false);
      }
    };

    fetchSalaryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!salaryDetails) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-600">No salary details found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Salary Details - {salaryDetails.month} {salaryDetails.year}
        </h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
            <Download className="h-5 w-5" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <Printer className="h-5 w-5" />
            Print
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Earnings</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Basic Salary</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${salaryDetails.basicSalary.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Overtime</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${salaryDetails.overtime.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Bonus</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${salaryDetails.bonus.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Deductions</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Tax</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${(salaryDetails.deductions * 0.6).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Insurance</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${(salaryDetails.deductions * 0.3).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Other</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${(salaryDetails.deductions * 0.1).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Net Salary</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${salaryDetails.netSalary.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</h3>
            <p className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              salaryDetails.status === 'Paid' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {salaryDetails.status}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Date</h3>
            <p className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Calendar className="h-4 w-4" />
              {salaryDetails.paymentDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetails;