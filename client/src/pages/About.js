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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                interdum augue leo, eget efficitur leo porta in. Donec eu
                interdum turpis, eget euismod felis. Nulla facilisi. Donec
                consectetur metus sit amet purus consequat, vel euismod libero
                tincidunt. Nam et diam convallis, condimentum neque ut,
                fringilla eros. Sed mattis dignissim dolor eu sodales. Aliquam
                erat volutpat. Aliquam eros diam, varius in mauris ac, rhoncus
                convallis purus. Etiam libero nibh, convallis nec euismod nec,
                pretium at justo.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Aenean mauris lorem, volutpat vitae accumsan eget, ornare
                posuere orci. Fusce diam enim, fringilla vel consequat in,
                congue id sem. Nunc nec vulputate felis, nec vehicula enim. In
                scelerisque purus sit amet elit placerat, eu pretium lorem
                tempus. Maecenas nec leo eget lacus posuere tristique et id
                purus. Nulla bibendum efficitur dui, eget varius nisi posuere
                at.
              </Typography>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default About;
