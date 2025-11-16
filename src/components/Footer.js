import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#006666] text-white py-10 px-6 shadow-inner border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-8 sm:space-y-0">
        
        {/* Contact Information */}
        <div className="w-full sm:w-1/2">
          <h3 className="font-bold text-2xl text-cyan-300 mb-3">Contact Us</h3>
          <p className="text-gray-300 mb-1">
            <span className="font-semibold text-white">Address:</span> IIIT UNA, Himachal Pradesh, India 177209
          </p>
          <p className="text-gray-300 mb-1">
            <span className="font-semibold text-white">Phone:</span> +91 9896941400
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Email:</span> 19shagunyadavnnl@gmail.com
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 sm:justify-end justify-center w-full sm:w-1/2">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110 shadow-md"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110 shadow-md"
          >
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>

          <a
            href="https://www.linkedin.com/in/shagun-yadav-a72513319/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110 shadow-md"
          >
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </a>
        </div>
      </div>

      {/* Divider Line */}
      <div className="mt-10 border-t border-white/10"></div>

      {/* Copyright Section */}
      <div className="text-center text-gray-400 text-sm mt-4">
        © {new Date().getFullYear()} <span className="text-cyan-300">MediSetu</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
