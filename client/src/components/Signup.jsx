import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = ({ openSignup, setOpenSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/signup",
        userInfo
      );

      console.log(res.data);


      setTimeout(() => {
        setOpenSignup();
      }, 2000);

      toast.success(res.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }

    console.log("User Data:", data);

    reset();
    


  };

  if (!openSignup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Sign Up</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                {...register("role")}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setOpenSignup(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:text-white hover:bg-red-500 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
