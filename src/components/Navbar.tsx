import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/favorites" className={`flex flex-col items-center ${location.pathname === '/favorites' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Heart size={24} />
            <span className="text-xs mt-1">Favorites</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center ${location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-600'}`}>
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;