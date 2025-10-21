import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../index.css';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
  <header className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-3xl transition-all duration-300 transform hover:scale-105"
          >
            Giga
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {isLoggedIn ? (
            <>
              {/* Menu untuk user yang login */}
              <Link 
                to="/packages" 
                className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-blue-600 transition-all duration-300 group"
              >
                Beli Paket
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link 
                to="/history" 
                className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-blue-600 transition-all duration-300 group"
              >
                Riwayat
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium rounded-lg border border-blue-100 hover:from-blue-100 hover:to-purple-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span>Halo, {user?.username}</span>
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 hover:shadow-md transition-all duration-300 group"
              >
                <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Menu untuk user yang logout */}
              <Link 
                to="/packages" 
                className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-blue-600 transition-all duration-300 group"
              >
                Lihat Paket
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link 
                to="/login" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
              >
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 bg-white">
          <div className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/packages" 
                  className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Beli Paket
                </Link>
                
                <Link 
                  to="/history" 
                  className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Riwayat
                </Link>
                
                <Link 
                  to="/profile" 
                  className="px-4 py-3 bg-blue-50 text-blue-600 font-medium rounded-lg border border-blue-100 transition-all duration-200 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  Halo, {user?.username}
                </Link>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/packages" 
                  className="px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Lihat Paket
                </Link>
                
                <Link 
                  to="/login" 
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  </header>
);
};

export default Header;