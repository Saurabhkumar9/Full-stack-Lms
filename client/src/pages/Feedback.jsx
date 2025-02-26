import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/show/feedback"
      );
      console.log("Fetched Data:", response.data);
      if (response.data.findFeedback) {
        setFeedbacks(response.data.findFeedback);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Error fetching feedbacks!");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/feedback/${id}`
      );

      if (response.status === 201 || response.status === 204) {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback._id !== id)
        );
        toast.success(
          response.data.message || "Feedback deleted successfully!"
        );
      } else {
        toast.error(
          `Delete failed: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error(error.response?.data?.message || "Error deleting feedback!");
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 shadow-lg rounded-lg text-white">
      <h3 className="text-xl font-semibold text-indigo-400 mb-4">
        📝 Feedbacks
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border rounded-lg">
          <thead className="bg-gray-700 text-indigo-300">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <tr key={feedback._id} className="border-t border-gray-600">
                  <td className="py-3 px-6">
                    {feedback.userId ? feedback.userId.name : "Unknown"}
                  </td>
                  <td className="py-3 px-6">
                    {feedback.userId ? feedback.userId.email : "No Email"}
                  </td>
                  <td className="py-3 px-6">{feedback.message}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-gray-400">
                  No feedback available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Feedback;
