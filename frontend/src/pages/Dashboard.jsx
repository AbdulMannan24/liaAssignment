import { useEffect, useState } from "react";
import { Api } from "../apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState(null);
  const [sort, setSort] = useState("1");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const url = Api + `/feedback/?sort=${sort}&category=${category}`;
        const response = await axios.get(url);
        if (response.data.code == 200) {
          setFeedbacks(response.data.data);
        } else {
          window.alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFeedbacks();
  }, [sort, category]);

  return (
    <div className="dark:bg-gray-800 overflow-auto h-screen text-black">
      <div className="container mx-auto px-4 py-2 md:px-8">
        {" "}
        {/* Basic container structure */}
        <div className="flex justify-between text-white">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <button
            className="text-1xl font-bold mb-4 border rounded-md px-2"
            onClick={() => navigate("/feedback")}
          >
            Send Feedback
          </button>
        </div>
        <div className="flex justify-start mb-4">
          <div className="flex items-center">
            <label htmlFor="category" className="mr-2 text-white">
              Select Category:
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">all</option>
              <option value="bug">bug</option>
              <option value="feature">feature request</option>
              <option value="suggestion">suggestion</option>
            </select>
          </div>
          <div className="flex items-center mx-4">
            <label htmlFor="sort" className="mr-2 text-white">
              Sort:
            </label>
            <select
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">oldest</option>
              <option value="-1">newest</option>
            </select>
          </div>
        </div>
        {feedbacks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white dark:bg-gray-700 rounded shadow-md p-4"
              >
                <h3> Name : {feedback?.userName}</h3> 
                <h3> Email : {feedback?.email} </h3> 
                <h3> category : {feedback?.category}</h3>
                <p> Feedback : {feedback?.feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-3xl text-center text-white m-10"> No Feedbacks yet</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
