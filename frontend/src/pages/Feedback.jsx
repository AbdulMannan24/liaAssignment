import axios from "axios";
import { useState } from "react";
import { Api } from "../apiConfig";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    category: "",
    feedback: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(Api + "/feedback/create", formData);
      if (response.data.code == 200) {
        navigate("/");
      } else if (response.data.code == 400) {
        window.alert(response.data.error);
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:bg-gray-800 overflow-auto h-screen ">
    <br />
    <div className="container mx-auto px-4 py-2 md:px-8">
      <h2 className="text-2xl font-bold text-white mb-4">Feedback Form</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Your Name"
            value={formData.userName}
            onChange={handleChange}
            required
            className="mt-1 block w-2/3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-2/3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-half rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="bug">Bug</option>
            <option value="suggestion">Suggestion</option>
            <option value="feature">Feature Request</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="mt-1 block w-2/3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
        </div>
    </div>
  );
}

export default Feedback;
