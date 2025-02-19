import React, { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);

 
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/get/all/register/student");
      if (response.data.status) {
        setStudents(response.data.data);
      } else {
        console.error("Error fetching students:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Student Information</h2>
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">📋 Student List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-3 px-6 text-left text-indigo-600">Name</th>
                  <th className="py-3 px-6 text-left text-indigo-600">Phone</th>
                  <th className="py-3 px-6 text-left text-indigo-600">Email</th>
                  <th className="py-3 px-6 text-left text-indigo-600">Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="py-3 px-6">{student.name}</td>
                    <td className="py-3 px-6">{student.phone}</td>
                    <td className="py-3 px-6">{student.email}</td>
                    <td className="py-3 px-6">{student.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
