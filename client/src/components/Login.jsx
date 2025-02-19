import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = ({ openLogin, setOpenLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res =await axios.post("http://localhost:4000/api/login", userInfo);

      toast.success(res.data.message);
      // console.log(res.data);

      localStorage.setItem("token",  res.data.token);
      
    } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong!");
          }
    }

    reset();
    setOpenLogin(false);
  };

  if (!openLogin) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Login</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setOpenLogin(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:text-white hover:bg-red-500 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
