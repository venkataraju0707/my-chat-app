import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null); // Reset error state on new request
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          withCredentials: true, // This allows credentials to be sent with the request
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response data is an array before setting it
        if (Array.isArray(response.data)) {
          setAllUsers(response.data);
        } else {
          console.warn("Expected response.data to be an array, received:", response.data);
          setAllUsers([]); // Set to empty array if data is not in expected format
        }
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
        setError("Failed to load users"); // Set an error message
      } finally {
        setLoading(false); // Ensure loading is set to false in all scenarios
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading, error]; // Return error state as well
}

export default useGetAllUsers;
