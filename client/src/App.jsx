import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CoursesAdd from "./pages/CoursesAdd";
import Students from "./pages/Students";
import Feedback from "./pages/Feedback";
import CoursesDetail from "./pages/CoursesDetail";
import LessonAdd from "./pages/LessonAdd";
import ContactList from "./pages/ContactList";
import { FaBars, FaTimes } from "react-icons/fa";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="flex min-h-screen">
        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto w-full md:w-[75%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coursesadd" element={<CoursesAdd />} />
            <Route path="/students" element={<Students />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/courseDetails/:id" element={<CoursesDetail />} />
            <Route path="/lessonAdd/:id" element={<LessonAdd />} />
            <Route path="/contact/info" element={<ContactList />} />
          </Routes>

          <ToastContainer />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
