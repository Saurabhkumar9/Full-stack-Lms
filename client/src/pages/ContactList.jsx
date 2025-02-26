import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/show/contact"
      );
      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/contact/${id}`
      );

      if (response.status === 201) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error(error.response.data.message || "Error deleting contact!");
    }
  };

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
        📞 Contact Submissions
      </h3>

      {/* ✅ Desktop & Tablet View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-3 px-6 text-left text-indigo-600">Name</th>
              <th className="py-3 px-6 text-left text-indigo-600">Email</th>
              <th className="py-3 px-6 text-left text-indigo-600">Phone</th>
              <th className="py-3 px-6 text-left text-indigo-600">Subject</th>
              <th className="py-3 px-6 text-left text-indigo-600">Message</th>
              <th className="py-3 px-6 text-left text-indigo-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="border-t">
                  <td className="py-3 px-6">{contact.name}</td>
                  <td className="py-3 px-6">{contact.email}</td>
                  <td className="py-3 px-6">{contact.phone}</td>
                  <td className="py-3 px-6">{contact.subject}</td>
                  <td className="py-3 px-6">{contact.message}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No contact submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile View - Stacked Card Layout */}
      <div className="md:hidden space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-gray-100 p-4 rounded-lg shadow"
            >
              <p className="text-indigo-600 font-semibold">{contact.name}</p>
              <p className="text-gray-600">{contact.email}</p>
              <p className="text-gray-600">{contact.phone}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Subject:</span>{" "}
                {contact.subject}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Message:</span>{" "}
                {contact.message}
              </p>
              <button
                onClick={() => handleDelete(contact._id)}
                className="mt-2 bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800 w-full"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No contact submissions found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactList;
