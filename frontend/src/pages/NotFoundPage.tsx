import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, TriangleAlert, User } from 'lucide-react'; // Using Lucide icons for consistency

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        
        {/* Icon */}
        <TriangleAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-bounce-slow" />

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        
        {/* Message */}
        <p className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</p>
        <p className="text-lg text-gray-600 mb-8">
          Oops! It looks like you've stumbled upon a page that doesn't exist.
          Don't worry, we'll help you find your way back.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          <Link
            to="/signin"
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <User className="h-5 w-5 mr-2" />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;