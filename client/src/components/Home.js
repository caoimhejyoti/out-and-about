import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import inputTheme from "./../style/theme";

const mainStyle = {
  width: "100vw",
};

const btnStyles = {
  marginBottom: "15px",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "Center",
              textAlign: "center",
              color: "white",
              maxWidth: "70%",
              backgroundColor: "RGBA(72,42,129,0.75)",
            }}
          >
            <p>
              Are you tired of walking alone and want to add some excitement to
              your daily routine? Join your local community Out & About to
              complete quests, solve riddles, and earn rewards all while making
              new friends along the way.
            </p>
            <Button
              size="large"
              style={btnStyles}
              variant="contained"
              onClick={btnHandle}
            >
              Sign up today!
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Home;
