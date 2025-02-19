import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";


function Lesson() {
  const [courseId, setCourseId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [courseName, setCourseName] = useState("");

  // Handle input change
  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  // Search function
  const token = localStorage.getItem("token");
  const handleSearch = async () => {
    if (!courseId) {
      toast.error("Please enter a course ID");
      return;
    }

    try {
      const courseResponse = await axios.get(
        `http://localhost:4000/api/admin/course/search/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (courseResponse.data) {
        setCourseName(courseResponse.data.courseName);

        const lessonResponse = await axios.get(
          `http://localhost:4000/api/admin/lesson/find`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter lessons based on courseId
        const filteredLessons = lessonResponse.data.filter(
          (lesson) => lesson.course_id === courseId
        );

        setLessons(filteredLessons);
      } else {
        toast.error("Course not found");
        setLessons([]);
      }
    } catch (error) {
      console.error("Error fetching course or lessons:", error);
      toast.error("Failed to fetch course or lessons.");
    }
  };

  return (
    <div className="flex flex-col items-center rounded-sm bg-gray-200 min-h-screen p-6">
      {/* Search Section */}
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-white text-center text-xl font-bold mb-4">
          Search Courses
        </h2>
        <input
          className="w-full p-2 mb-3 rounded bg-black text-white outline-none"
          placeholder="Enter Course ID"
          type="text"
          value={courseId}
          onChange={handleCourseIdChange}
        />
        <button
          className="w-full bg-blue-600 hover:bg-red-700 p-2 rounded text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Lessons Table */}
      {lessons.length > 0 && (
        <div className="w-full max-w-4xl mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-center text-white text-xl font-bold mb-3">
            {courseName || "Course Name"}
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="p-2">Lesson ID</th>
                <th className="p-2">Lesson Name</th>
                <th className="p-2">Lesson Video</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-b border-gray-600">
                  <td className="p-2 text-center text-white">{lesson._id}</td>
                  <td className="p-2 text-center text-white">
                    {lesson.lesson_title}
                  </td>
                  <td className="p-2 text-center">
                    <a
                      href={lesson.lesson_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Watch Video
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Lesson;
