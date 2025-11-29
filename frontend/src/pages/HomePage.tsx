import React, { useState} from 'react';
import { 
  BarChart, 
  Trash2, 
  RefreshCw, 
  Truck, 
  AlertTriangle, 
  CheckCircle,
  Menu,
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Components ---

// 1. Navigation Bar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
                <RefreshCw className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">EcoBin IoT</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-600 transition">Fleet Map</a>
            
            {/* Login Link for Desktop */}
            <Link 
              to="/signin"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Login
            </Link>

            {/* Sign Up Button for Desktop */}
            <Link 
              to="/signup" // 🎯 Changed to /register (or /signup if that's your path)
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Fleet Map</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Analytics</a>
          {/* Mobile Login and Sign Up Links */}
          <Link to="/signin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link> 
          <Link to="/signup" className="block px-4 py-2 text-gray-700 bg-green-50 hover:bg-green-100 font-semibold">Sign Up</Link> 
        </div>
      )}
    </nav>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <div className="bg-green-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Smarter Cities start with <br />
          <span className="text-green-600">Smart Waste Management</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Monitor fill levels in real-time, optimize collection routes, and reduce carbon footprint with our IoT-enabled waste sensors.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-lg transition">
            View Live Demo
          </button>
          <button className="bg-white text-green-600 border border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition">
            Contact Sales
          </button>
        </div>
      </div>
      
    </div>
  );
};

// 3. Stats Section
const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
      {trend && <span className="text-green-500 text-sm font-medium">{trend}</span>}
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

// 4. Features Section
const Feature = ({ title, description, icon }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4 h-16 w-16 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// --- Main Page Component ---
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <main>
        <Hero />

        {/* Live Stats Overview */}
        <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              title="Bins Monitored" 
              value="1,248" 
              icon={<Trash2 size={24} color="#16a34a" />} 
              color="green"
            />
            <StatCard 
              title="Collection Eff." 
              value="94%" 
              trend="+5.2%" 
              icon={<BarChart size={24} color="#2563eb" />} 
              color="blue"
            />
            <StatCard 
              title="Active Trucks" 
              value="18" 
              icon={<Truck size={24} color="#ea580c" />} 
              color="orange"
            />
            <StatCard 
              title="Alerts" 
              value="3" 
              trend="Needs Action" 
              icon={<AlertTriangle size={24} color="#dc2626" />} 
              color="red"
            />
          </div>
        </section>
        
        {/* Diagram Trigger for System Overview */}
        <section className="py-20 bg-white mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
               

[Image of IoT waste management system diagram flow]

               <p className="mt-4 text-gray-500">From sensor to dashboard: seamless data integration.</p>
            </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose EcoBin IoT?</h2>
              <p className="text-gray-600 mt-4">Optimize your operations with data-driven decisions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Feature 
                title="Real-time Monitoring" 
                description="Ultrasonic sensors detect fill levels instantly, preventing overflows and unsightly messes."
                icon={<CheckCircle size={32} />}
              />
              <Feature 
                title="Dynamic Routing" 
                description="Our AI algorithms calculate the most efficient pickup routes based on actual bin status, saving fuel."
                icon={<Truck size={32} />}
              />
              <Feature 
                title="Detailed Analytics" 
                description="Generate comprehensive reports on waste generation patterns to improve city planning."
                icon={<BarChart size={32} />}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your waste management?</h2>
            <p className="text-green-100 mb-8 text-lg">
              Join over 50 municipalities utilizing our Smart Waste Solution.
            </p>
            <button className="bg-white text-green-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Schedule a Consultation
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-white text-xl font-bold">EcoBin IoT</span>
            <p className="text-sm mt-2">© 2024 EcoBin Systems. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;