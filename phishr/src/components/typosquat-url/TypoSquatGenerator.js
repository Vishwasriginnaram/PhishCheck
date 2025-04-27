import React, { useState } from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import Cookies from 'js-cookie';
import SnackBar from '../SnackBar';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

function TypoSquatGenerator() {
  const [input_Url, setUrl] = useState('');
  const [output, setOutput] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('info');

  const savedEmail = Cookies.get('email');

  const setSnackbarState = (message, severity, open) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setOpenSnackbar(open);
  };

  const requestDomainDetails = async (input_Url) => {
    setShowProgress(true);
    const MAX_DOMAINS = 50;
    const api_url = "http://localhost:8000/get_typesquatted_urls";

    const data = {
      url: input_Url.toLowerCase(),
      max_num: MAX_DOMAINS,
    };

    try {
      const response = await axios.post(api_url, data);
      const responseData = response.data;
      setShowProgress(false);
      return responseData.output;
    } catch (error) {
      setShowProgress(false);
      window.alert("Network Error Occurred! Try again.");
      throw error;
    }
  };

  const Result = () => {
    if (output === null) return null;

    const columns = [
      { field: 'domain_name', headerName: 'DOMAIN 🔽', width: 250 },
      { field: 'country', headerName: 'Country 🌐', width: 100 },
      { field: 'creation_date', headerName: 'Creation Date 📅', width: 250 },
      { field: 'registrar', headerName: 'Registrar 👤', width: 200 },
      { field: 'name_servers', headerName: 'Name Servers', width: 400 },
      { field: 'status', headerName: 'Status 🕵️', width: 200 },
    ];

    const rows = output.map((item, index) => ({
      id: index + 1,
      domain_name: item.domain_name,
      country: item.country,
      creation_date: item.creation_date,
      registrar: item.registrar,
      name_servers: item.name_servers,
      status: item.status,
    }));

    return (
      <div className="mt-10 mx-5 text-gray-300 sm:mx-[5%] mb-10 bg-deepBlue rounded-2xl p-5 shadow-lg">
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={50}
          style={{
            backgroundColor: '#0a192f',
            color: '#D1D5DB',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
          sx={{
            '.MuiDataGrid-cell': { borderBottom: '1px solid #00f3ff33' },
            '.MuiDataGrid-columnHeaders': { backgroundColor: '#020c1b', color: '#00f3ff', fontSize: '1rem' },
            '.MuiDataGrid-footerContainer': { backgroundColor: '#020c1b', color: '#00f3ff' },
            '.MuiTablePagination-root': { color: '#00f3ff' },
          }}
        />
      </div>
    );
  };

  const handleClick = async () => {
    if (input_Url.length <= 4) {
      setSnackbarState("Please provide a valid domain address!", "warning", true);
      return;
    }

    try {
      setButtonClicked(true);
      const output = await requestDomainDetails(input_Url);

      if (!output) {
        setButtonClicked(false);
        setSnackbarState("Provided URL must be valid and active!", "warning", true);
        return;
      }

      setOutput(output.allDomains);
      setButtonClicked(false);
    } catch (error) {
      setButtonClicked(false);
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-darkBlue font-sans py-12">
        <Header LoggedInUser={savedEmail} />

        <main className="flex-grow flex flex-col items-center">
          <div className="mt-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-neonBlue">DomainDoppelganger <br/>⚠️🕵️</h2>
            <p className="mt-4 text-base opacity-80 mx-6 sm:mx-[24%] text-gray-300">
              Identify potential typesquatting threats and find lookalike domains that adversaries can use to attack you.
              Discover similar looking registered URLs and take proactive measures to protect your brand and stay one step ahead in the digital landscape.
            </p>
          </div>

          <div className="flex flex-col md:flex-row mt-10 w-full justify-center items-center gap-5">
            <input
              type="text"
              placeholder="Enter valid domain address or URL"
              onChange={(event) => setUrl(event.target.value)}
              className="w-[90%] lg:w-[50%] px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
            />

            <button
              onClick={handleClick}
              disabled={buttonClicked}
              className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
            >
              {buttonClicked ? "Scanning..." : "SCAN"}
            </button>
          </div>

          {showProgress && (
            <div className="mt-8 flex flex-col items-center">
              <p className="mb-3 font-light text-neonBlue">Scanning, this will take 1-2 minutes.....</p>
              <CircularProgress style={{ color: '#00f3ff' }} size={60} />
            </div>
          )}

          <Result />
        </main>
      </div>
      <Footer />
      <SnackBar
        openSnackbar={openSnackbar}
        setopenSnackbar={setOpenSnackbar}
        snackMessage={snackMessage}
        severity={snackSeverity}
        autoHideDuration={1500}
        position={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
}

export default TypoSquatGenerator;
