import axios from "axios";
import { useState, useEffect } from "react";
import PDFViewer from './PDFViewer';
const HomePage = () => {
  const [user, setUser] = useState(null);
  const[imageUrl,setImageUrl]=useState("")
  const[docu,setDocu]=useState("")
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
          console.log(userData);
          if (userData.image) {
            setImageUrl(`http://127.0.0.1:8000${userData.image}`);
            console.log(imageUrl)
          }
          if (userData.document) {
            setDocu(`http://127.0.0.1:8000${userData.document}`);
            console.log(imageUrl)
          }
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
          {user.image?<img src={imageUrl} alt="This image is not loaded"/>:null}
         
          {/* {docu ? <PDFViewer fileUrl={docu} /> : <p>Loading PDF data...</p>} */}
         
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;
