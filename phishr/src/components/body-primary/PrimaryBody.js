import { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

function get_Prediction(url, showProgress, setLoading, navigate) {
  if (url.length <= 5) {
    console.log("URL provided is less than 5 characters!");
    return;
  }

  url = url.toLowerCase();
  showProgress(true);
  setLoading(true);

  const api_url = "http://localhost:8000/predict";
  const data = { url };

  axios
    .post(api_url, data)
    .then((response) => {
      const output = response.data["prediction"];
      showProgress(false);
      setLoading(false);
      navigate("/result", { state: { inputUrl: url, output } });
    })
    .catch(() => {
      showProgress(false);
      setLoading(false);
      window.alert("Network Error Occurred! Try again.");
    });
}

export function PrimaryBody(props) {
  const [input_Url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const showProgress = props.showProgress;
  const navigate = useNavigate();

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-darkBlue border-t-transparent rounded-full animate-spin-slower"></div>
          </div>
        </div>
      )}

      <section className="bg-darkBlue min-h-screen flex items-center py-24 lg:py-12 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white font-sans">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Stay Safe in the <span className="text-neonBlue">Digital World</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Don't get caught in a phishing trap. Happens 2.6 million times a year, but with our tool, you can protect yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter website URL (eg: www.tesla.com)"
                onChange={(e) => setUrl(e.target.value)}
                className="w-full flex-1 px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
              />
              <button
                onClick={() => get_Prediction(input_Url, showProgress, setLoading, navigate)}
                className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
              >
                SCAN URL
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[400px] bg-gradient-to-r from-neonBlue/20 to-deepBlue rounded-lg backdrop-blur-xl flex items-center justify-center">
              <i className="bi bi-shield-lock text-neonBlue text-8xl"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
