import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import lp_11 from "./lp_11.png";
import lp_10 from "./lp_10.png";
import lp_12 from "./lp_12.png";

function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#006666] text-white font-sans min-h-screen">
      <NavBar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />

      <section className="flex flex-col sm:flex-row items-center justify-center max-w-7xl mx-auto px-6 sm:px-10 py-20 sm:py-28 transition-all duration-700">
        {/* Image Section */}
        <div
          className="relative w-full sm:w-[60%] h-[400px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={lp_10}
            alt="EHR Illustration"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
              !isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src={lp_11}
            alt="Blockchain Healthcare"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src={lp_12}
            alt="Patient Data Visualization"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
              isHovered ? "opacity-60" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="mt-10 sm:mt-0 sm:ml-10 w-full sm:w-[40%] bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 transition-transform duration-700 hover:scale-105">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-cyan-300">
            Revolutionizing Healthcare Data with Blockchain
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-8">
            <span className="font-semibold text-white">MediSetu</span> uses{" "}
            <span className="text-cyan-300">Ethereum</span> and{" "}
            <span className="text-teal-300">IPFS</span> for secure, transparent,
            and decentralized Electronic Health Records. With{" "}
            <span className="text-cyan-200">Metamask</span> and{" "}
            <span className="text-cyan-200">Truffle</span>, MediSetu empowers
            users with full control over their medical data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => {
                setIsShrunk(true);
                navigate("/register");
              }}
              className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-xl shadow-md hover:bg-cyan-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => {
                setIsShrunk(true);
                navigate("/aboutPage");
              }}
              className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-[#003366] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
