import React from 'react';
import GoogleLogo from '../assets/google_logo.png';

const GoogleSignUpButton = ({ handleClick }) => {
  return (
    <button
      className="flex items-center justify-center px-4 py-2 mt-6 
      bg-darkBlue border border-neonBlue text-neonBlue
      hover:bg-neonBlue hover:text-darkBlue
      active:bg-deepBlue
      rounded-md focus:outline-none transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div className="bg-darkBlue rounded-md p-1">
        <img src={GoogleLogo} alt="Google Logo" className="w-4 h-4" />
      </div>
      <span className="font-medium ml-2">Register with Google</span>
    </button>
  );
};

const GoogleLoginButton = ({ handleClick }) => {
  return (
    <button
      className="flex items-center justify-center px-4 py-2
      bg-darkBlue border border-neonBlue text-neonBlue
      hover:bg-neonBlue hover:text-darkBlue
      active:bg-deepBlue
      rounded-md focus:outline-none transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div className="bg-darkBlue rounded-md p-1">
        <img src={GoogleLogo} alt="Google Logo" className="w-4 h-4" />
      </div>
      <span className="font-medium ml-2">Sign In with Google</span>
    </button>
  );
};

export { GoogleLoginButton, GoogleSignUpButton };
