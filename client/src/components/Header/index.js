import React from "react";
// import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

function Header({ currentPage, handlePageChange }) {
  const navStyle = {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    color: "white",
  };
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  return (
    <header className="text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <a href="/">
            <img className="m-0" src={logo} alt="logo" />
          </a>
        </div>

        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                href="#dashboard"
                style={navStyle}
                onClick={() => handlePageChange("Dashboard")}
                className={
                  currentPage === "Dashboard" ? "nav-link active" : "nav-link"
                }
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#friends"
                style={navStyle}
                onClick={() => handlePageChange("Friends")}
                className={
                  currentPage === "Friends" ? "nav-link active" : "nav-link"
                }
              >
                Friends
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#profile"
                style={navStyle}
                onClick={() => handlePageChange("Profile")}
                className={
                  currentPage === "Profile" ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </a>
            </li>
          </ul>

          <button>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
