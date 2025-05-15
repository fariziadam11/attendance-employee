import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileSearch } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <FileSearch className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary btn-lg flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;