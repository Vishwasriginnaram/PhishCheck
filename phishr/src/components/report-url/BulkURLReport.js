import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'js-cookie';
import { reportBulkURLsToDatabase } from '../../db/db_utils';

const BulkURLreport = ({ setSnackbarState, setReportClicked, reportAnonymously }) => {
    const [bulkURLInput, setBulkURLInput] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const savedEmail = Cookies.get('email');

    const handleRecaptchaChange = (value) => {
        setCaptchaVerified(true);
    };

    const extractURLs = (text) => {
        return text.split(/[, ]+/).filter(url => url.trim() !== '').map(url => url.trim());
    };

    const reportBulkURL = async () => {
        setReportClicked(true);

        if (bulkURLInput.length < 5) {
            setReportClicked(false);
            setSnackbarState("Please enter valid URLs!", "warning", true);
            return;
        }

        if (!captchaVerified) {
            setReportClicked(false);
            setSnackbarState("Please Verify the CAPTCHA!", "warning", true);
            return;
        }

        const reportedBy = reportAnonymously ? "Anonymous" : savedEmail;
        const urls = extractURLs(bulkURLInput);

        if (urls.length > 1000) {
            setReportClicked(false);
            setSnackbarState("Max Input Limit is 1000 URLs! Reduce the number of URLs", "warning", true);
            return;
        }

        const isReported = await reportBulkURLsToDatabase(urls, "Other", reportedBy, additionalDetails);
        
        if (isReported) {
            setSnackbarState("URLs Reported Successfully!", "success", true);
        } else {
            setSnackbarState("Failed to Report URLs, try again!", "error", true);
        }

        setReportClicked(false);
    };

    return (
        <div className="mt-8 mx-6 lg:mx-40 flex flex-col py-6 px-6 rounded-xl border border-neonBlue/20 bg-deepBlue  shadow-md">
            <p className="text-white text-xl font-semibold mb-4">Enter URLs (Max 1000 URLs)</p>
            <textarea
                onChange={(e) => setBulkURLInput(e.target.value)}
                className="w-full h-40 px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                placeholder="Enter URLs separated by commas or spaces..."
            />

            <p className="text-white text-xl font-semibold mb-4 mt-6">Additional Details (optional)</p>
            <textarea
                maxLength={10000}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full h-48 px-4 py-3 rounded-lg text-white bg-[#ffffff0d] border border-[#00f3ff33] transition-all duration-300 ease-in-out focus:border-[#ffffff] focus:ring-1 focus:ring-[#ffffff] focus:outline-none"
                placeholder="Provide any extra information about the URLs..."
            />

            <div className="flex justify-center mt-8">
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleRecaptchaChange}
                />
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={reportBulkURL}
                    className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
                >
                    REPORT URL
                </button>
            </div>
        </div>
    );
};

export default BulkURLreport;
