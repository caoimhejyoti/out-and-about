import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, Grid, Typography } from "@mui/material";
import inputTheme from "../style/theme";

const mainStyle = {
  width: "100vw",
};

const About = () => {
  return (
    <main>
      <ThemeProvider theme={inputTheme}>
        <Container>
          <Box sx={{ display: "flex" }}>
            <Grid item xs={12}>
              <Typography variant="h2" marginY={5}>
                About Us
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                One late Thursday night, a group of Web Development students
                located across Australia were tasked with designing and building
                a full stack web application that solved a real-world problem.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                The idea for Out and About came from a desire to help people get
                out and see their local area. We wanted to create a platform
                that would allow users to explore the area while completing
                quests designed by us.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                We understand the need to have movement in your life, but this
                app is not designed with fitness in mind. We encourage you to
                use this app as an opportunity to meet with friends, visit
                somewhere new and have fun!
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Each quest has been designed to be completed in under an hour,
                with a car park, toilets and a cafe nearby. We hope you enjoy
                exploring your local area as much as we have enjoyed creating
                this app.
              </Typography>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default About;
