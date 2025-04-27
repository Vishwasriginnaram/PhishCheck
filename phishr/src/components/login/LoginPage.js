import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Header } from '../header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import LinearProgress from "@mui/material/LinearProgress";
import { isPasswordCorrect, userExists, getUserDocument } from '../../db/db_utils';
import SnackBar from '../SnackBar';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import AuthenticationGif from "../../assets/Authentication.gif";
import { GoogleLoginButton } from '../GoogleButtons';
import { auth, googleAuthProvider } from '../../db/firebase-config';
import { signInWithPopup } from 'firebase/auth';
const stringHash = require("string-hash");

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmailInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('info');

  const savedEmail = Cookies.get('email');

  useEffect(() => {
    if (savedEmail) {
      navigate('/');
    }
  }, []);

  function setSnackbarState(message, severity, open) {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setopenSnackbar(open);
  }

  const loginHandler = async () => {
    setLoginClicked(true);

    if (!email || !password) {
      setSnackbarState("Please fill all values!", "warning", true);
      setLoginClicked(false);
      return;
    }

    const hashPassword = stringHash(password);
    const userValid = await isPasswordCorrect(email, hashPassword);

    if (userValid) {
      setSnackbarState("Account Verified!", "success", true);
      Cookies.set('email', email);
      Cookies.set('password', hashPassword);
      setTimeout(() => {
        setLoginClicked(false);
        navigate('/home');
      }, 500);
      return;
    }

    setLoginClicked(false);
    setSnackbarState("Email or Password Incorrect! Try again", "error", true);
    return;
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const email = user.email;

      const existsAlready = await userExists(email);
      if (!existsAlready) {
        setSnackbarState("Provided Email is Not Registered! Sign Up Now", "warning", true);
        return;
      } else {
        const userDoc = await getUserDocument(email);
        Cookies.set('email', userDoc.Email);
        Cookies.set('password', userDoc.Password);
        navigate("/");
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <>
      <Header LoggedInUser={savedEmail} />
      {loginClicked && <LinearProgress color="error" />}

      <div className="bg-darkBlue pt-24 pb-12 flex items-center justify-center">
        <div className='bg-deepBlue w-full max-w-3xl rounded-lg p-8 border border-neonBlue/30 shadow-lg flex flex-col items-center text-neonBlue font-sans'>

        <h1 className="text-4xl font-bold text-center mb-4">Welcome Back</h1>

        <img src={AuthenticationGif} alt="Authentication" className="w-[18%] mb-6 rounded-xl" />

        <div className="w-3/4 max-w-md">
          <div className="flex items-center mb-5">
            <input
              placeholder="Registered Email Address"
              type="text"
              onChange={(e) => setEmailInput(e.target.value)}
              maxLength={64}
              className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
          </div>
        </div>

        <div className="w-3/4 max-w-md relative">
  <div className="flex items-center rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue">
    <input
      placeholder="Password"
      type={showPassword ? 'text' : 'password'}
      onChange={(e) => setPasswordInput(e.target.value)}
      maxLength={64}
      className="w-full bg-darkBlue text-white py-3 px-4 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-neonBlue"
    />
    <div className="absolute right-3 cursor-pointer">
      {showPassword ? (
        <RiEyeLine className="text-neonBlue h-6 w-6" onClick={() => setShowPassword(false)} />
      ) : (
        <RiEyeOffLine className="text-neonBlue h-6 w-6" onClick={() => setShowPassword(true)} />
      )}
    </div>
  </div>
</div>

        <div className='flex flex-row items-center justify-center gap-x-6 mt-6'>
          <GoogleLoginButton handleClick={handleSignInWithGoogle} />
          <button
            onClick={loginHandler}
            className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
          >
            LOGIN
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-300 text-base font-medium">Don't have an account?</span>
          <Link to="/signup" className="text-neonBlue font-bold underline ml-2 hover:text-white transition">
            Create Account
          </Link>
        </div>

      </div>
      </div>

      <Footer />

      <SnackBar
        openSnackbar={openSnackbar}
        setopenSnackbar={setopenSnackbar}
        snackMessage={snackMessage}
        severity={snackSeverity}
        autoHideDuration={1000}
        position={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default LoginPage;
