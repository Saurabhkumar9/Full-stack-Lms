import React, { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { IoBookSharp, IoLogOut } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { MdSell, MdFeedback } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Logout = () => {
    localStorage.removeItem("token");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Toggle Button (Only for Mobile) */}
      <button
        className="fixed top-12 right-2 z-50 md:hidden bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen md:h-screen z-40  text-white p-4 transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-80`}
      >
        <ul className="menu h-full rounded-xl bg-gray-900">
          <li className="text-lg font-bold text-center mb-4">
            <Link
              to="/"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <AiFillDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <IoBookSharp size={20} />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <PiStudentFill size={20} />
              <span>Students</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact/info"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <MdSell size={20} />
              <span>Contact Info</span>
            </Link>
          </li>
          <li>
            <Link
              to="/payments"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <RiSecurePaymentFill size={20} />
              <span>Payments Status</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <MdFeedback size={20} />
              <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={closeSidebar}
            >
              <TbLockPassword size={20} />
              <span>Change Password</span>
            </Link>
          </li>
          <li className="mt-auto">
            <button
              onClick={() => {
                Logout();
                closeSidebar();
              }}
              className="flex items-center gap-3 p-2 rounded-md bg-red-600 hover:bg-red-700 w-full"
            >
              <IoLogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
