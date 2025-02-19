import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function LessonAdd() {
  const {id} = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues:{
      courseId: id
    }
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("courseId", data.courseId);
      formData.append("lessonTitle", data.lessonTitle);
      formData.append("lessonDescription", data.lessonDescription);
      formData.append("video", data.video[0]);

      // Make POST request to API
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
    } catch (error) {
      toast.error(
        "Error adding lesson: " + error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 rounded-sm">
      <div className="bg-gray-400 p-6 m-2 rounded-lg shadow-lg w-[70%]">
        <div className="text-center bg-slate-900 p-4 rounded-sm">
          <p className="font-bold text-white text-xl">Add Lesson {id}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Course ID */}
          <label className="block text-gray-900 font-medium">Course ID</label>
          <input
            type="text"
            {...register("courseId", { required: "Course ID is required" })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.courseId && (
            <p className="text-red-800">{errors.courseId.message}</p>
          )}

          {/* Lesson Title */}
          <label className="block text-gray-900 font-medium">
            Lesson Title
          </label>
          <input
            type="text"
            {...register("lessonTitle", {
              required: "Lesson Title is required",
            })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.lessonTitle && (
            <p className="text-red-800">{errors.lessonTitle.message}</p>
          )}

          {/* Lesson Description */}
          <label className="block text-gray-900 font-medium">
            Lesson Description
          </label>
          <textarea
            {...register("lessonDescription", {
              required: "Lesson Description is required",
            })}
            className="w-full p-2 border rounded mb-3"
          ></textarea>
          {errors.lessonDescription && (
            <p className="text-red-800">{errors.lessonDescription.message}</p>
          )}

          {/* Upload Video */}
          <label className="block text-gray-900 font-medium">
            Upload Video
          </label>
          <input
            type="file"
            accept="video/*"
            {...register("video", { required: "Video file is required" })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.video && (
            <p className="text-red-800">{errors.video.message}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <a
              href="/"
              className="mr-2 px-4 py-2 bg-red-700 text-white rounded"
            >
              Close
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
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
