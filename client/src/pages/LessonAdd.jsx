import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function LessonAdd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      courseId: id,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("courseId", data.courseId);
      formData.append("lessonTitle", data.lessonTitle);
      formData.append("lessonDescription", data.lessonDescription);
      formData.append("video", data.video[0]);

      const response = await axios.post(
        "http://localhost:4000/api/lesson/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message);
      reset();
      navigate(-1); // 🔹 Automatically go back after submission
    } catch (error) {
      toast.error(
        "Error adding lesson: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="text-center bg-indigo-600 p-4 rounded-md text-white">
          <h2 className="text-xl font-bold">Add Lesson</h2>
          <p className="text-xl  text-white">(Course ID: {id})</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Course ID (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium">Course ID</label>
            <input
              type="text"
              {...register("courseId")}
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          {/* Lesson Title */}
          <div>
            <label className="block text-gray-700 font-medium">
              Lesson Title
            </label>
            <input
              type="text"
              {...register("lessonTitle", {
                required: "Lesson Title is required",
              })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter Lesson Title"
            />
            {errors.lessonTitle && (
              <p className="text-red-600 text-sm">
                {errors.lessonTitle.message}
              </p>
            )}
          </div>

          {/* Lesson Description */}
          <div>
            <label className="block text-gray-700 font-medium">
              Lesson Description
            </label>
            <textarea
              {...register("lessonDescription", {
                required: "Lesson Description is required",
              })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter Lesson Description"
            ></textarea>
            {errors.lessonDescription && (
              <p className="text-red-600 text-sm">
                {errors.lessonDescription.message}
              </p>
            )}
          </div>

          {/* Upload Video */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              {...register("video", { required: "Video file is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.video && (
              <p className="text-red-600 text-sm">{errors.video.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LessonAdd;
