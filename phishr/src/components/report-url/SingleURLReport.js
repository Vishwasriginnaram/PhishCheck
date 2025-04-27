import React, { useState } from 'react';
import Cookies from 'js-cookie';
import ReCAPTCHA from "react-google-recaptcha";
import { reportURLtoDatabase } from '../../db/db_utils';

const SingleURLreport = ({ setSnackbarState, setReportClicked, reportAnonymously }) => {
    const [singleURLInput, setSingleURLInput] = useState("");
    const [urlSource, setUrlSource] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const savedEmail = Cookies.get('email');

    const handleRecaptchaChange = (value) => {
        setCaptchaVerified(true);
    };

    const reportSingleURL = async () => {
        setReportClicked(true);

        if (singleURLInput.length < 5 || selectedCategory === "") {
            setReportClicked(false);
            setSnackbarState("Please enter a valid URL and select Category!", "warning", true);
            return;
        }

        if (!captchaVerified) {
            setReportClicked(false);
            setSnackbarState("Please Verify the CAPTCHA!", "warning", true);
            return;
        }

        let reportedBy = reportAnonymously ? "Anonymous" : savedEmail;
        const isReported = await reportURLtoDatabase(singleURLInput, selectedCategory, reportedBy, urlSource, additionalDetails);

        if (isReported) {
            setSnackbarState("URL Reported Successfully!", "success", true);
        } else {
            setSnackbarState("Failed to Report URL, try again!", "error", true);
        }

        setReportClicked(false);
    };

    return (
        <div className="mt-8 mx-auto max-w-3xl p-8 rounded-xl border border-neonBlue/20 bg-deepBlue">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">REPORT A SINGLE URL</h3>

            <div className="flex flex-col space-y-5">
                <input
                    type="text"
                    placeholder="Enter URL of the site"
                    value={singleURLInput}
                    onChange={(e) => setSingleURLInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-400 bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                >
                    <option value="" disabled className="bg-deepBlue">Select category</option>
                    <option value="phishing" className="bg-deepBlue">Phishing</option>
                    <option value="malware" className="bg-deepBlue">Malware</option>
                    <option value="spam" className="bg-deepBlue">Spam</option>
                    <option value="fraud" className="bg-deepBlue">Fraud</option>
                    <option value="hate-speech" className="bg-deepBlue">Hate Speech</option>
                    <option value="scam" className="bg-deepBlue">Scam</option>
                    <option value="other" className="bg-deepBlue">Other</option>
                </select>

                <input
                    type="text"
                    placeholder="Source of URL (optional)"
                    value={urlSource}
                    onChange={(e) => setUrlSource(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                />

                <textarea
                    maxLength={10000}
                    placeholder="Additional details (optional)"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="h-40 w-full px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#fffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                />
            </div>

            <div className="flex justify-center mt-8">
                <ReCAPTCHA className='transform scale-[0.8]'
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleRecaptchaChange}
                />
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={reportSingleURL}
                    className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
                >
                    REPORT URL
                </button>
            </div>
        </div>
    );
};

export default SingleURLreport;
