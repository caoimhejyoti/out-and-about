import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import inputTheme from "./../style/theme";

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

const Home = () => {
  const navigate = useNavigate();

  const btnHandle = () => {
    console.log("hello landing page button");
    navigate("/signup");
  };
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
