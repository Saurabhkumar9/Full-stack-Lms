import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CoursesAdd from "./pages/CoursesAdd";
import Students from "./pages/Students";
import Feedback from "./pages/Feedback";
import CoursesDetail from "./pages/CoursesDetail";
import LessonAdd from "./pages/LessonAdd";
import { ToastContainer } from "react-toastify";
import ContactList from "./pages/ContactList";

function App() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row w-full p-2">
        <div className="bg-base-300 rounded-sm w-full md:w-[25%] m-2 p-4">
          <Sidebar />
        </div>

        <div className="card bg-base-300 rounded-box grid h-auto w-full md:w-[74%] m-2 p-4">
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

      <Footer />
    </>
  );
}

export default App;
