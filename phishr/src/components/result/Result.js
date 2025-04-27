import { Header } from "../header/Header";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import WarningGif from "../../assets/Warning.gif";
import SafeGif from "../../assets/Safe.gif";
import URLSafeGif from "../../assets/UrlSafe.gif";

export function Result(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  useEffect(() => {
    if (locationState == null) {
      console.log("Redirecting to Home");
      navigate("/");
    }
  }, [locationState, navigate]);

  if (locationState == null) {
    console.log("LocationState is null");
    return null;
  }

  const HIGHEST_URL_SCORE = 180;
  const input_url = locationState["inputUrl"];
  const output = locationState["output"];
  const url_score = output["SCORE"];
  let THREAT_LEVEL = null;

  if (url_score >= 120) {
    THREAT_LEVEL = "SAFE";
  } else if (url_score > 60 && url_score < 120) {
    THREAT_LEVEL = "POTENTIAL";
  } else {
    THREAT_LEVEL = "RISKY";
  }

  function OutputStatement({ THREAT_LEVEL }) {
    if (THREAT_LEVEL === "SAFE") {
      return (
        <h1 className="font-light text-center mt-3 text-neonBlue text-3xl md:text-4xl">
          The given URL is <span className="font-extrabold">SAFE ✅</span> — No Malicious activity detected.
        </h1>
      );
    }
    if (THREAT_LEVEL === "POTENTIAL") {
      return (
        <h1 className="font-light text-center mt-3 text-yellow-400 text-3xl md:text-4xl">
          The given URL is <span className="font-extrabold">Potentially Risky ⚠️</span> — Use caution while visiting.
        </h1>
      );
    }
    return (
      <h1 className="font-light text-center mt-3 text-red-500 text-3xl md:text-4xl">
        The given URL is <span className="font-extrabold">Highly Malicious ❌</span> — Avoid visiting it!
      </h1>
    );
  }

  function GifOutput({ THREAT_LEVEL }) {
    if (THREAT_LEVEL === "SAFE") {
      return (
        <img src={SafeGif} alt="URL Safe Gif" className="mx-auto mt-8 w-1/3 animate-glow" />
      );
    }
    return (
      <img src={WarningGif} alt="Warn Gif" className="mx-auto mt-8 w-1/3 animate-glow" />
    );
  }

  return (
    <>
      <Header />

      <section className="bg-darkBlue min-h-screen py-12 px-4 text-white font-sans">
        <div className="container mx-auto">

          <GifOutput THREAT_LEVEL={THREAT_LEVEL} />

          <h1 className="font-semibold text-center text-neonBlue text-2xl md:text-3xl mt-8">
            "{input_url}"
          </h1>

          <OutputStatement THREAT_LEVEL={THREAT_LEVEL} />

          <div className="flex justify-center mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                In Top Most Visited Sites: {output.InTop1Million ? '✅ Yes' : '❌ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                SSL Certificate Detected: {output.hasSSLCertificate ? '✅ Yes' : '❌ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Domain Older Than 3 Months: {output.isOlderThan3Months ? '✅ Yes' : '❌ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Temporary Domain Usage: {output.isTemporaryDomain ? '❌ Yes' : '✅ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Passed Google WebSafe: {output.GoogleSafePassed ? '✅ Yes' : '❌ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Passed Norton WebSafe: {output.NortanWebSafePassed ? '✅ Yes' : '❌ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Blacklisted in URLVoid: {output.InURLVoidBlackList ? '❌ Yes' : '✅ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Blacklisted in McAfee: {output.InMcaffeBlackList ? '❌ Yes' : '✅ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Blacklisted in Sucuri: {output.InSucuriBlacklist ? '❌ Yes' : '✅ No'}
              </div>
              <div className="bg-deepBlue p-4 rounded-lg border-2 border-neonBlue text-center">
                Blacklisted in IpSets: {output.isBlackListedinIpSets ? '❌ Yes' : '✅ No'}
              </div>
            </div>
          </div>

          {output["target_urls"].length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="bg-deepBlue p-6 rounded-lg border-2 border-neonBlue text-center w-fit">
                <span className="text-3xl">👮‍♂️</span> <br />
                <span className="text-neonBlue font-semibold">Possible Target Brands:</span>
                <ul className="mt-4 space-y-2">
                  {output["target_urls"].slice(0, 5).map((url, index) => (
                    <li key={index}>
                      <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="text-neonBlue underline hover:text-white">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-neonBlue text-darkBlue font-bold rounded-lg hover:bg-white transition hover:animate-glow"
            >
              Try Again
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
