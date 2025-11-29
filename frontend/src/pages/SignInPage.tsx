import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { type AuthStore } from "../../store/useAuthStore";
import { useShallow } from 'zustand/shallow';
import { Eye, EyeOff, Loader2, Mail, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Define the type for the form state
interface FormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Select login action and loading state from the store
  const { login, isLoggingIn } = useAuthStore(
        useShallow((state: AuthStore) => ({
            login: state.login,
            isLoggingIn: state.isLoggingIn,
        }))
    );

  // Type guard function for validation result
  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  // Type the event handler for the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create a new object for submission to match the store's expected type
      const submissionData = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };
      // Type casting here ensures the submission matches the store's definition (AuthStore.ts)
      login(submissionData as any); 
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* 1. Left Side: Themed Background (Matching SignUpPage) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-green-600 text-white p-12">
        <RefreshCw className="h-20 w-20 mb-6" />
        <h2 className="text-4xl font-bold mb-4">Welcome Back to EcoBin</h2>
        <p className="text-lg text-green-100 text-center">
          Access your dashboard to monitor bin levels, track routes, and optimize collection schedules.
        </p>
      </div>
      
      {/* 2. Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* LOGO & TITLE */}
          <div className="text-center mb-8">
            <Link to="/" className="flex flex-col items-center gap-2 group">
              <span className="ml-2 text-2xl font-bold text-gray-800 flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-green-600" /> EcoBin IoT
              </span>
            </Link>
            <h1 className="text-3xl font-bold mt-4">Sign In to Your Account</h1>
            <p className="text-gray-500">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="you@citycouncil.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoggingIn}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Using Mail icon here as a placeholder for a generic security icon */}
                  <Mail className="h-5 w-5 text-gray-400" /> 
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoggingIn}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 flex justify-center items-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-gray-500">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-green-600 hover:underline font-medium">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;