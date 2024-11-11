import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import Logo from "../../assets/logo_circle.jpg";

import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState();

  // Use effect to update the user from localStorage and set interval cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser);
    }, 5000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.setItem("loginStatus", "false"); // Save as string
    localStorage.removeItem("user");
  };

  if (user === "admin") {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid box">
          <img className="logo" src={Logo} alt="Logo" />
          <div className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/view-event">View Events</Link></li>
              <li><Link to="/create-event">Create Event</Link></li>
              <li><Link to="/view-user">View Users</Link></li>
            </ul>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <BiSolidUserCircle className="usericon admin" />
              {user}
            </button>
            <div className="dropdown-content admin">
              <Link to="/" onClick={logout}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  } else if (user) {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid box">
          <img className="logo" src={Logo} alt="Logo" />
          <div className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/view-event">Events</Link></li>
              <li><Link to="/contact">CONTACT US</Link></li>
            </ul>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              <BiSolidUserCircle className="usericon user" />
              {user}
            </button>
            <div className="dropdown-content user">
              <Link to="/edit-profile">Edit Profile</Link>
              <Link to="/booked-events">Booked Events</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid box">
          <img className="logo" src={Logo} alt="Logo" />
          <div className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">CONTACT US</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
