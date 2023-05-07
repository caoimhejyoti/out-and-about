import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

const buttonStyle = {
  marginInline: 10,
  paddingInline: 5,
};
const navStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  justifyContent: "space-between",
  color: "white",
};

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = "/login";
  };
  return (
    <header className="mb-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link to="/">
            <img className="m-0" src={logo} alt="logo" />
          </Link>
        </div>

        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard" style={navStyle}>
                Dashboard
              </Link>
              <Link to="/me" style={navStyle}>
                Profile
              </Link>
              <Link to="/qrcode" style={navStyle}>
                QRCode
              </Link>
              <button style={buttonStyle} onClick={logout}>
                Logout
              </button>
              {/* <button style={buttonStyle}>Logout</button> */}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
