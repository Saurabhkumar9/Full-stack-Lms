import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Project Info */}
          <div>
            <h2 className="text-2xl font-bold">Final Year Project</h2>
            <p className="mt-2 text-gray-300">
              A smart learning management system designed to enhance online
              education with AI-powered assistance.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h2 className="text-xl font-bold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-gray-300 hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right - Contact & Socials */}
          <div>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="mt-2 text-gray-300">Email: support@project.com</p>
            <p className="text-gray-300">Phone: +91 98765 43210</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center text-gray-400">
          © {new Date().getFullYear()} Final Year Project. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
