import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/', {
         headers,
          withCredentials: true, // Send cookies with the request
        });

        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
        } else {
          console.error('Error fetching user data:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          {user.name ? <p>Name: {user.name}</p> : null}
          {user.email ? <p>Email: {user.email}</p> : null}
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;