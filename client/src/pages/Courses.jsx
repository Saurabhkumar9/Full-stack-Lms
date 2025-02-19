import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Fetch courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/find/course"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to delete a course
  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        console.log("Token:", localStorage.getItem("token"));

        await axios.delete(`http://localhost:4000/api/delete/course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourses(courses.filter((course) => course._id !== id)); // Update state after deletion
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex flex-wrap gap-4">
        {courses.map((item) => (
          <div
            key={item._id}
            className="card bg-white rounded-lg shadow-lg w-64 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <figure className="relative h-40">
              <img
                src={item.image}
                alt="Course Image"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {item.courseName}
              </h2>
              <div className="flex items-center  mb-4">
                <p className="text-gray-600">Price: </p>
                <p className="text-red-600 font-bold">{item.coursePrice}</p>
              </div>

              {/* Buttons Row */}
              <div className="flex justify-end   gap-2">
                <button
                  onClick={() => deleteCourse(item._id)}
                  className="pl-2 pr-2 bg-red-600 text-white   rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/courseDetails/${item._id}`)}
                  className="pl-2 pr-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Button */}
      <div className="fixed bottom-8 right-8">
        <button className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
          <a href="/coursesadd">
            <IoAdd size={30} />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Courses;
