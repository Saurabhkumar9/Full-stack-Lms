import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function CoursesAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("coursePrice", data.coursePrice);
    formData.append("authorName", data.authorName);
    formData.append("courseDescription", data.courseDescription);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      console.log("Image not selected");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/add/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data);
      toast.success("Course added successfully!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center bg-indigo-600 p-3 rounded-sm">
          <p className="font-bold text-white text-lg">Add Course</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-gray-800 font-medium">
              Course Name
            </label>
            <input
              type="text"
              {...register("courseName", {
                required: "Course Name is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.courseName && (
              <p className="text-red-600 text-sm">
                {errors.courseName.message}
              </p>
            )}
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-gray-800 font-medium">
              Author Name
            </label>
            <input
              type="text"
              {...register("authorName", {
                required: "Author Name is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.authorName && (
              <p className="text-red-600 text-sm">
                {errors.authorName.message}
              </p>
            )}
          </div>

          {/* Course Price */}
          <div>
            <label className="block text-gray-800 font-medium">
              Course Price
            </label>
            <input
              type="number"
              {...register("coursePrice", {
                required: "Course Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price must be greater than 0" },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.coursePrice && (
              <p className="text-red-600 text-sm">
                {errors.coursePrice.message}
              </p>
            )}
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-gray-800 font-medium">
              Course Description
            </label>
            <textarea
              {...register("courseDescription", {
                required: "Course Description is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            {errors.courseDescription && (
              <p className="text-red-600 text-sm">
                {errors.courseDescription.message}
              </p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-800 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.image && (
              <p className="text-red-600 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <a
              href="/courses"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoursesAdd;
