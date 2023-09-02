import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Header = () => {


    const handleLogout = async () => {
        try {
          await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
          // Clear the token from localStorage or wherever it's stored
          localStorage.removeItem('jwt');
          // Redirect to the login page or another page
        //   <Navigate to="/login"  />
        window.location.href = '/login'; 
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
    
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Siddhartha Pandit</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                              
                                   
                                <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}


export default Header;