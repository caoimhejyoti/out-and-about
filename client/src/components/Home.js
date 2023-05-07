import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import inputTheme from "./../style/theme";
import { Navigate } from "react-router-dom";

const mainStyle = {
  width: "100vw",
};

const btnStyles = {
  marginBottom: "45px",
  backgroundColor: "white",
  color: "#981FC2",
  width: "40vw",
  height: "7vh",
};

const btnHandle = () => {
  console.log("hello landing page button");
  window.location.href = "/signup";
};

const Home = () => {
  return (
    <main style={mainStyle}>
      <ThemeProvider theme={inputTheme}>
        <div className="hero hero-image">
          <Button
            size="large"
            style={btnStyles}
            variant="contained"
            onClick={btnHandle}
          >
            Sign up today!
          </Button>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Home;
