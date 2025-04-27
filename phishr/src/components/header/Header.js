import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export function Header({ LoggedInUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-deepBlue/90 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center font-sans">
        <Link to="/" className="text-2xl font-bold text-neonBlue tracking-wide">
          PHISHr 🎣
        </Link>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="nav-link text-white hover:text-neonBlue transition">HOME</Link>
          <Link to="/report" className="nav-link text-white hover:text-neonBlue transition">REPORT URL</Link>
          <Link to="/typesquat_url_generator" className="nav-link text-white hover:text-neonBlue transition">TYPOSQUATTING</Link>
          <Link to="/reported_urls" className="nav-link text-white hover:text-neonBlue transition">DATABASE</Link>
          <a href="https://phishr-api.up.railway.app/docs" target="_blank" rel="noreferrer" className="nav-link text-white hover:text-neonBlue transition">API</a>
          {LoggedInUser ? (
            <>
              <Link to="/profile" className="nav-link text-white hover:text-neonBlue transition">
                {LoggedInUser}
              </Link>
              <Link to="/profile" className="text-neonBlue hover:text-white transition">
                <FaUserCircle className="w-6 h-6" />
              </Link>
            </>
          ) : (
            <Link to="/login" className="nav-link text-neonBlue hover:text-white transition">LOGIN</Link>
          )}
        </nav>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl">
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-deepBlue/90 p-4`}>
        <Link to="/" className="block text-white text-md py-2">HOME</Link>
        <Link to="/report" className="block text-white text-md py-2">REPORT URL</Link>
        <Link to="/typesquat_url_generator" className="block text-white text-md py-2">TYPOSQUATTING</Link>
        <Link to="/reported_urls" className="block text-white text-md py-2">DATABASE</Link>
        <a href="https://phishr-api.up.railway.app/docs" target="_blank" rel="noreferrer" className="block text-white text-md py-2">API</a>
        {LoggedInUser ? (
          <div className="flex flex-col space-y-2">
            <Link to="/profile" className="text-neonBlue text-xl">{LoggedInUser}</Link>
            <Link to="/profile" className="text-neonBlue text-2xl">
              <FaUserCircle />
            </Link>
          </div>
        ) : (
          <Link to="/login" className="block text-neonBlue text-md py-2">LOGIN</Link>
        )}
      </div>
    </header>
  );
}
