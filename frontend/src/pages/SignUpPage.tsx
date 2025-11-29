import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { type AuthStore } from "../../store/useAuthStore";
import { useShallow } from 'zustand/shallow';
import { Eye, EyeOff, Loader2, Mail, User, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Define the type for the form state
interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  // Ensure the useAuthStore hook is typed correctly in its own file
const { signup, isSigningUp } = useAuthStore(
        useShallow((state: AuthStore) => ({
            signup: state.signup,
            isSigningUp: state.isSigningUp,
        }))
    );

  // Type guard function for validation result
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
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
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
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
        username: formData.name.trim(), // Assuming your backend expects 'fullName'
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };
      // Type casting here ensures the submission matches the store's definition (AuthStore.ts)
      signup(submissionData as any); 
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* 1. Left Side: Themed Background (Matching HomePage Green) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-green-600 text-white p-12">
        <RefreshCw className="h-20 w-20 mb-6" />
        <h2 className="text-4xl font-bold mb-4">EcoBin IoT Portal</h2>
        <p className="text-lg text-green-100 text-center">
          Intelligent Waste Management Starts Here. Register to access real-time bin data and route optimization features.
        </p>
        

[Image of IoT trash bin with sensor diagram]

      </div>
      
      {/* 2. Right Side: Sign Up Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* LOGO & TITLE */}
          <div className="text-center mb-8">
            <Link to="/" className="flex flex-col items-center gap-2 group">
              <span className="ml-2 text-2xl font-bold text-gray-800 flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-green-600" /> EcoBin IoT
              </span>
            </Link>
            <h1 className="text-3xl font-bold mt-4">Create Your Account</h1>
            <p className="text-gray-500">
              Get started with smart waste management today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })}
                  disabled={isSigningUp}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email" // Changed to type="email" for better mobile keyboard support
                  className="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="you@citycouncil.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })}
                  disabled={isSigningUp}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })}
                  disabled={isSigningUp}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="text-green-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;