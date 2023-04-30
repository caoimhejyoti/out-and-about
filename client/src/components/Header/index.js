import React from "react";
// import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

function Header() {
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
          <img href="/" className="m-0" src={logo} alt="logo" />
        </div>

        <div>
          <a href="##" style={navStyle}>
            Dashboard
          </a>
          <a href="##" style={navStyle}>
            Friends
          </a>
          <a href="/profile" style={navStyle}>
            Profile
          </a>
          <button>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
