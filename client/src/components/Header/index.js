import React from "react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

const buttonStyle = {
  marginInline: 10,
  paddingBlock: 5,
  paddingInline: 10,
  borderRadius: 5,
  color: "white",
  backgroundColor: "#C854a5",
};
const navStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  justifyContent: "space-between",
  color: "white",
};

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/login");
  };
  return (
    <header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "Center",
          marginInline: "10%",
        }}
      >
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard">
                <img className="m-0" src={logo} alt="logo" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <img className="m-0" src={logo} alt="logo" />
              </Link>
            </>
          )}
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
              <Link to="/about" style={navStyle}>
                About
              </Link>
              <Link to="/faq" style={navStyle}>
                FAQs
              </Link>
              <Link to="/login" style={buttonStyle}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
