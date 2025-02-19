import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { IoBookSharp } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { MdSell, MdFeedback } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";
const Sidebar = () => {


  const Logout = () => {
    localStorage.removeItem("token");
  };
  


  return (
    <>
      <div>
        <ul className="menu bg-gray-900 text-white min-h-full rounded-xl w-80 p-4">
          {/* Sidebar content here */}
          <li className="text-lg font-bold text-center mb-4">
            <Link to="/"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
            >
              <AiFillDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li></li>
          <li>
            <Link 
              to="/courses"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
            >
             <IoBookSharp size={20} />
              <span>Courses</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/students"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
            >
              <PiStudentFill size={20} />
              <span>Students</span>
            </Link>
          </li>
          <li>
            <Link to="/contact/info" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
              <MdSell size={20} />
              <span>contact info</span>
            </Link>
          </li>
          <li>
            <a className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
              <RiSecurePaymentFill size={20} />
              <span>Payments Status</span>
            </a>
          </li>
          <li>
            <Link
              to="/feedback"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
            >
              <MdFeedback size={20} />
              <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
              <TbLockPassword size={20} />
              <span>Change Password</span>
            </Link>
          </li>
          <li className="mt-4">
            <button onClick={()=>Logout()} className="flex items-center gap-3 p-2 rounded-md bg-red-600 hover:bg-red-700">
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
