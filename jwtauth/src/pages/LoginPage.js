import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use Axios for the POST request
     

      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      }, {
        withCredentials: true, // Include cookies with the request
      });
      

      if (response.status === 200) {
       
        const token = response.data.token;
        localStorage.setItem('jwt', token);
        Cookies.set('jwt', token, { expires: 7 }); // Example: Cookie expires in 7 days

      
        // console.log("Token ",token)
      } else {
        // Handle login failure (e.g., display an error message)
        console.error("Login failed:", response.status, response.data);
      }
      setRedirect(true)
    } catch (error) {
     
      console.error("Error:", error);
    }
    const cookies = document.cookie;




  };
  
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
