import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Left - About Project */}
          <div>
            <h2 className="text-2xl font-bold">Next Gens Learn with AI</h2>
            <p className="mt-3 text-gray-300">
              AI-powered Learning Management System designed to enhance online education with smart tools.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-gray-300 hover:text-white transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right - Contact & Socials */}
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="mt-3 text-gray-300">Email: support@ai-learn.com</p>
            <p className="text-gray-300">Phone: +91 98765 43210</p>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400">
          © {new Date().getFullYear()} Next Gens Learn with AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
