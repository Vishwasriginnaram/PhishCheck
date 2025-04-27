import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import SnackBar from '../SnackBar';
import LinearProgress from "@mui/material/LinearProgress";
import { IOSSwitch } from './ToggleButton';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import BulkURLreport from './BulkURLReport';
import SingleURLreport from './SingleURLReport';

const ReportURL = () => {
  const navigate = useNavigate();
  const [reportInBulk, setReportInBulk] = useState(false);
  const [reportAnonymously, setReportAnonymously] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('info');

  const savedEmail = Cookies.get('email');

  const setSnackbarState = (message, severity, open) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setOpenSnackbar(open);
  };

  if (!savedEmail) {
    return (
      <>
        <Header />
        <div className="min-h-screen relative bg-darkBlue text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-deepBlue blur-md opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="p-8 rounded-2xl shadow-xl bg-darkBlue bg-opacity-90">
              <h3 className="text-3xl font-bold mb-4 text-neonBlue">Please Login 🔒</h3>
              <p className="text-gray-400 mb-8">To report URLs, you need to login first.</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-neonBlue hover:bg-neonBlue/80 text-black font-semibold py-2 px-6 rounded-md transition-all duration-300">
                LOGIN
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header LoggedInUser={savedEmail} />
      {reportClicked && <LinearProgress color="primary" />}
      <div className="bg-darkBlue min-h-screen text-white py-12 px-6">
        <div className="pt-12 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-neonBlue">Report a suspicious site <br/>👮🚨</h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Report any suspicious URLs hosting phishing content, distributing malware, or engaging in other malicious activities for
            analysis by our classification system. Help us maintain a secure online environment by submitting them here.
          </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-x-16 mt-10">
          <span className="flex items-center gap-2">
            <IOSSwitch onChange={(e) => setReportInBulk(e.target.checked)} />
            <span className="text-gray-300">Report in Bulk</span>
          </span>
          {/* <span className="flex items-center gap-2">
            <IOSSwitch onChange={(e) => setReportAnonymously(e.target.checked)} />
            <span className="text-gray-300">Report Anonymously</span>
          </span> */}
        </div>

        <div className="mt-10">
          {reportInBulk ? 
            <BulkURLreport setSnackbarState={setSnackbarState} setReportClicked={setReportClicked} reportAnonymously={reportAnonymously} /> :
            <SingleURLreport setSnackbarState={setSnackbarState} setReportClicked={setReportClicked} reportAnonymously={reportAnonymously} />
          }
        </div>
      </div>
      <Footer />

      <SnackBar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackMessage={snackMessage}
        severity={snackSeverity}
        autoHideDuration={2000}
        position={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default ReportURL;
