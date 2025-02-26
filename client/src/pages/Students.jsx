import React, { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get/all/register/student"
      );
      if (response.data.status) {
        setStudents(response.data.data);
      } else {
        setError("Failed to fetch students.");
      }
    } catch (error) {
      setError("Error fetching student data. Please try again!");
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen py-8 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-400">
          📚 Student Information
        </h2>
        <div className="mt-6 p-6 bg-gray-800 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-300 mb-4">
            📋 Student List
          </h3>

          {loading ? (
            <p className="text-center text-gray-300">Loading students...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg">
                <thead className=" text-indigo-300">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t border-gray-600 hover:bg-gray-800 transition"
                    >
                      <td className="py-3 px-6">{student.name}</td>
                      <td className="py-3 px-6">{student.phone}</td>
                      <td className="py-3 px-6">{student.email}</td>
                      <td className="py-3 px-6">{student.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
