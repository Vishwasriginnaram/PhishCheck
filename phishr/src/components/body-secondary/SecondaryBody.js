export function SecondaryBody() {
  return (
    <section className="bg-darkBlue border-t-2 border-neonBlue/30 py-12 px-6 font-sans text-white">
      <div className="container mx-auto">
        <h2 className="text-center text-white font-extrabold text-3xl md:text-4xl mb-8">
          How Does It Work?
        </h2>
        <p className="text-center text-gray-300 font-light text-base sm:text-lg md:text-xl leading-relaxed md:px-20 lg:px-40">
          Phishing is a widespread online scam where cybercriminals impersonate legitimate websites to deceive users. 
          To counteract this threat, our system leverages a powerful blend of technologies:
          <br /><br />
          We use an advanced Artificial Neural Network trained on a massive dataset of over <span className="text-neonBlue font-semibold">600,000 URLs</span>, 
          alongside a thorough analysis of the top 1 million most-visited sites globally.
          <br /><br />
          In addition, we cross-check URLs against trusted blacklist sources like <span className="text-neonBlue font-semibold">Google Safe Browsing, Norton Safe Web, URLVoid</span>, and more. 
          <br /><br />
          These combined strategies allow us to deliver a highly accurate and reliable detection mechanism, 
          ensuring you stay protected from phishing attacks and malicious websites.
        </p>
      </div>
    </section>
  );
}
