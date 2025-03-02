
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto pt-10 pb-16 text-center lg:pt-20 lg:pb-24">
          <div className="animate-slide-up">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
              Secure & Reliable
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Welcome to </span>
              <span className="block text-primary xl:inline">SecureShop</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              A modern e-commerce platform with secure authentication and seamless shopping experience
            </p>
            <div className="mt-8 flex justify-center gap-x-4">
              {user ? (
                <Link to="/products">
                  <Button size="lg" className="px-8 py-6">
                    Browse Products
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="px-8 py-6">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" className="px-8 py-6">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="max-w-7xl mx-auto py-16">
          <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of security and user experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                JWT-based authentication system ensures your data remains protected and private
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Product Management</h3>
              <p className="text-gray-600">
                Browse through our extensive collection of products with easy navigation
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Efficient Pagination</h3>
              <p className="text-gray-600">
                Smart pagination system for smooth browsing through large product collections
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
