import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import stringHash from 'string-hash';
import SnackBar from '../SnackBar';
import { Header } from '../header/Header';
import { isPasswordCorrect, changeUserPassword } from '../../db/db_utils';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [OldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('info');

  const savedEmail = Cookies.get('email');
  const savedPassword = Cookies.get('password');

  useEffect(() => {
    if (!savedEmail) {
      navigate('/');
    }
  }, [savedEmail, navigate]);

  const setSnackbarState = (message, severity, open) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setOpenSnackbar(open);
  };

  const handlePasswordChange = async () => {
    if (!OldPassword || !NewPassword || !ConfirmNewPassword) {
      setSnackbarState('Please fill all fields!', 'warning', true);
      return;
    }

    if (NewPassword !== ConfirmNewPassword) {
      setSnackbarState("New passwords don't match!", 'warning', true);
      return;
    }

    const OldHashPassword = stringHash(OldPassword);
    const isValid = await isPasswordCorrect(savedEmail, OldHashPassword);
    if (!isValid) {
      setSnackbarState('Old password is incorrect!', 'warning', true);
      return;
    }

    if (OldPassword === NewPassword) {
      setSnackbarState('New password is same as old password!', 'warning', true);
      return;
    }

    const NewHashPassword = stringHash(NewPassword);
    const isPassUpdated = await changeUserPassword(savedEmail, NewHashPassword);

    if (isPassUpdated) {
      setSnackbarState('Password updated successfully!', 'success', true);
      setTimeout(() => navigate('/home'), 2000);
    } else {
      setSnackbarState('Password update failed! Try again later.', 'error', true);
    }
  };

  return (
    <>
      <Header LoggedInUser={savedEmail} />

      <div className="bg-white min-h-screen pt-24 flex flex-col items-center">
        <FaLock className="text-black mb-3 max-[450px]:w-5 max-[450px]:h-5 w-7 h-7" />
        <p className="max-[450px]:text-xl text-2xl mb-8 font-semibold text-black">
          Change Account Password
        </p>

        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
          <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
          <input
            placeholder="Enter Old Password"
            type={showOldPassword ? 'text' : 'password'}
            onChange={(e) => setOldPassword(e.target.value)}
            maxLength={64}
            className="bg-transparent w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none"
          />
          {showOldPassword ? (
            <RiEyeOffLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowOldPassword(false)}
            />
          ) : (
            <RiEyeLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowOldPassword(true)}
            />
          )}
        </div>

        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
          <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
          <input
            placeholder="Enter New Password"
            type={showNewPassword ? 'text' : 'password'}
            onChange={(e) => setNewPassword(e.target.value)}
            maxLength={64}
            className="bg-transparent w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none"
          />
          {showNewPassword ? (
            <RiEyeOffLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowNewPassword(false)}
            />
          ) : (
            <RiEyeLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowNewPassword(true)}
            />
          )}
        </div>

        <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md mb-5">
          <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
          <input
            placeholder="Confirm New Password"
            type={showNewPassword ? 'text' : 'password'}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            maxLength={64}
            className="bg-transparent w-full pl-3 py-5 text-gray-800 font-medium focus:outline-none"
          />
          {showNewPassword ? (
            <RiEyeOffLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowNewPassword(false)}
            />
          ) : (
            <RiEyeLine
              className="mr-7 text-slate-500 h-7 w-7 cursor-pointer"
              onClick={() => setShowNewPassword(true)}
            />
          )}
        </div>

        <button
          onClick={handlePasswordChange}
          className="bg-sky-500 text-white text-md font-bold max-[450px]:px-10 px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700"
        >
          CHANGE PASSWORD
        </button>
      </div>

      <SnackBar
        openSnackbar={openSnackbar}
        setopenSnackbar={setOpenSnackbar}
        snackMessage={snackMessage}
        severity={snackSeverity}
        autoHideDuration={2000}
        position={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
}
