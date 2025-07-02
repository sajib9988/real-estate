'use client';

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Home,  Phone, User, Building, Key, DollarSign, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext'; // Assuming you have a UserContext
import { logout } from '@/service/auth';

export default function RealEstateNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  
  // Get user data from context
  const { user} = useUser(); // Assuming you have user and logout function

  const placeholderTexts: string[] = [
    "Search luxury apartments...",
    "Find your dream home...",
    "Explore commercial spaces...",
    "Discover new properties...",
    "Search by location...",
    "Find rental properties..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'Buy', href: '/buy', icon: Key },
    { name: 'Rent', href: '/rent', icon: DollarSign },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  // Get dashboard URL based on user role
  const getDashboardUrl = (role: string) => {
    switch (role) {
      case 'superadmin':
        return '/dashboard/superAdmin';
      case 'admin':
        return '/dashboard/admin';
      case 'seller':
        return '/dashboard/seller';
      case 'buyer':
        return '/dashboard/buyer';
      default:
        return '/dashboard';
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes placeholder-fade {
          0%, 20% { opacity: 1; }
          80%, 100% { opacity: 0.7; }
        }
        
        .placeholder-transition {
          transition: all 0.3s ease;
        }
      `}</style>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transform group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
                  <Home className="h-6 w-6 text-white animate-pulse" />
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RealEstate Pro
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 animate-bounce" />
                  <input
                    type="text"
                    placeholder={placeholderTexts[placeholderIndex]}
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none placeholder-transition"
                    style={{
                      animation: 'placeholder-fade 3s infinite'
                    }}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium group"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 group-hover:animate-pulse transition-all duration-200 group-hover:scale-110" />
                    )}
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Conditional rendering based on user authentication */}
              {user ? (
                <div className="flex items-center space-x-2 ml-4">
                  {/* Dashboard Button */}
                  <Link
                    href={getDashboardUrl(user.role)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
                  >
                    <LayoutDashboard className="h-4 w-4 group-hover:animate-pulse" />
                    <span className="capitalize">{user.role} Dashboard</span>
                  </Link>
                  
                  {/* User Profile/Logout */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-all duration-200">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">{user.first_name || user.email}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
                >
                  <User className="h-4 w-4 group-hover:animate-spin" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 group"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
                ) : (
                  <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 animate-bounce" />
              <input
                type="text"
                placeholder={placeholderTexts[placeholderIndex]}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-20 py-2.5 border border-gray-200 rounded-full bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'slideIn 0.3s ease-out forwards'
                    }}
                  >
                    {Icon && (
                      <Icon className="h-5 w-5 group-hover:animate-pulse group-hover:scale-110 transition-all duration-200" />
                    )}
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Auth Section */}
              {user ? (
                <>
                  {/* Dashboard Button for Mobile */}
                  <Link
                    href={getDashboardUrl(user.role)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-lg mt-4 hover:shadow-lg transition-all duration-200 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 group-hover:animate-pulse" />
                    <span className="capitalize">{user.role} Dashboard</span>
                  </Link>
                  
                  {/* User Info */}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-700">
                      <User className="h-5 w-5" />
                      <span className="font-medium">{user.first_name || user.email}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <button
                     onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg mt-4 hover:shadow-lg transition-all duration-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 group-hover:animate-spin" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

  
    </div>
  );
}