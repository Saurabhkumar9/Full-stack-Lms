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
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 rounded-sm">
      <div className="bg-gray-400 p-6 m-2 rounded-lg shadow-lg w-[70%]">
        <div className="text-center bg-slate-900 p-4 rounded-sm">
          <p className="font-bold text-white text-xl">Add Course</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Course Name */}
          <label className="block text-gray-900 font-medium">Course Name</label>
          <input
            type="text"
            {...register("courseName", { required: "Course Name is required" })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.courseName && (
            <p className="text-red-800">{errors.courseName.message}</p>
          )}

          {/* Author Name */}
          <label className="block text-gray-900 font-medium">Author Name</label>
          <input
            type="text"
            {...register("authorName", { required: "Author Name is required" })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.authorName && (
            <p className="text-red-800">{errors.authorName.message}</p>
          )}

          {/* Course Price */}
          <label className="block text-gray-900 font-medium">
            Course Price
          </label>
          <input
            type="number"
            {...register("coursePrice", {
              required: "Course Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be greater than 0" },
            })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.coursePrice && (
            <p className="text-red-800">{errors.coursePrice.message}</p>
          )}

          {/* Course Description */}
          <label className="block text-gray-900 font-medium">
            Course Description
          </label>
          <textarea
            {...register("courseDescription", {
              required: "Course Description is required",
            })}
            className="w-full p-2 border rounded mb-3"
          ></textarea>
          {errors.courseDescription && (
            <p className="text-red-800">{errors.courseDescription.message}</p>
          )}

          {/* Upload Image */}
          <label className="block text-gray-900 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.image && (
            <p className="text-red-800">{errors.image.message}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <a
              href="/courses"
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

export default CoursesAdd;
