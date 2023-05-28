import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import inputTheme from "../style/theme";
import Signup from "./Signup";

const mainStyle = {
  width: "100vw",
};

const Home = () => {
  return (
    <main style={mainStyle}>
      <ThemeProvider theme={inputTheme}>
        <div className="hero hero-image">
          <Box sx={{ flexGrow: 1, maxWidth: "80%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h2" marginY={5}>
                  Want to add some excitement to your daily routine?
                </Typography>
                <Typography variant="subtitle1" marginTop={5}>
                  Sign up to Out&About to complete quests, solve riddles, and
                  earn rewards by walking around your local area while making
                  new friends along the way.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" marginTop={5}>
                  Join Out&About today!
                </Typography>
                <Signup />
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Home;
