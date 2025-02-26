import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

function CoursesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [courseInfo, setCoursesInfo] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/single/course/fetch/${id}`
        );

        console.log(response.data);
        setCoursesInfo(response.data.course);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [id]);
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/lesson/fetch/${id}`
        );
        setLessons(response.data.lessons);
        console.log(response.data);
        console.log(response.data._id);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [id]);

  const handleDelete = async (lessonId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/lesson/delete/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setLessons((prevLessons) =>
          prevLessons.filter((lesson) => lesson._id !== lessonId)
        );
        toast.success(response.data.meassage);
      } else {
        toast.error("Failed to delete the lesson!");
      }
    } catch (error) {
      toast.error(error.response.data.meassage);
    }
  };

  return (
    <div className="bg-gray-100">
      <h2 className="text-3xl  font-bold text-gray-900 text-center mb-2">
        Course Details
      </h2>
      <p className="text-md lg:text-2xl text-red-500 text-center">(ID: {id})</p>

      <div className="left-0 p-12 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-600">
          <strong>Course Name:</strong> {courseInfo.courseName}
        </h3>
        <p className="mt-2 text-gray-600">
          <strong>Course Description:</strong> {courseInfo.courseDescription}
        </p>
        <p className="mt-2 text-gray-600">
          <strong>Course Mentor:</strong> {courseInfo.authorName}
        </p>
        <p className="mt-2 text-gray-600">
          <strong>Course Price:</strong> {courseInfo.coursePrice}
        </p>
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            📚 Lesson List
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-3 px-6 text-left text-indigo-600">
                    Lesson Title
                  </th>
                  <th className="py-3 px-6 text-left text-indigo-600">
                    Description
                  </th>
                  <th className="py-3 px-6 text-left text-indigo-600">
                    Lesson Link
                  </th>
                  <th className="py-3 px-6 text-left text-indigo-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <tr key={lesson._id} className="border-t">
                      <td className="py-3 px-6">{lesson.lessonTitle}</td>
                      <td className="py-3 px-6">{lesson.lessonDescription}</td>
                      <td className="py-3 px-6">
                        <a
                          href={lesson.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          view lesson
                        </a>
                      </td>
                      <td className="py-3 px-6 flex space-x-4">
                        <button
                          onClick={() => handleDelete(lesson._id)}
                          className="bg-red-600 pr-3 pl-3 rounded-sm text-white hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-red-600 p-4">
                      No lessons found for this course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Add Lesson Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => navigate(`/lessonAdd/${id}`)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          {/* <a href="/lessonAdd"> */}
          <IoAdd size={30} />
          {/* </a> */}
        </button>
      </div>
    </div>
  );
}

export default CoursesDetail;
