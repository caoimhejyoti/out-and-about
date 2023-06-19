import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, Grid, Typography } from "@mui/material";
import inputTheme from "../style/theme";

const mainStyle = {
  width: "100vw",
};

const FAQs = () => {
  return (
    <main>
      <ThemeProvider theme={inputTheme}>
        <Container>
          <Box sx={{ display: "flex" }}>
            <Grid item xs={12}>
              <Typography variant="h2" marginY={5}>
                FAQs
              </Typography>
              <Typography variant="h5" marginY={2}>
                How can I take part?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Sign up for a free account and head to your dashboard. Once
                their, answer the riddle to get your first quest map. Once you
                have that - it is up to you when you complete your quest.
              </Typography>
              <Typography variant="h5" marginY={2}>
                How much time do I have to complete the quest?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Out and About is completely self lead. You can go at your own
                speed, there is no time limit to complete the quest.
              </Typography>
              <Typography variant="h5" marginY={2}>
                Where are the QR codes?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Sign up for a free account and head to your dashboard. Once
                there, answer the riddle to get your first quest map. Once you
                have that - it is up to you when you complete your quest.
              </Typography>
              <Typography variant="h5" marginY={2}>
                How many Quests are there?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                At the minute there are only 5 Quests but we are working hard to
                create more so keep an eye on your dashboard for the next badge
                to collect.
              </Typography>
              <Typography variant="h5" marginY={2}>
                How difficult are the Quests?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                The quests start of easy and get harder as you go along. That
                said, this is not a hiking app. All quests are designed to be
                completed in under an hour.
              </Typography>
              <Typography variant="h5" marginY={2}>
                What facilities are near the quests?
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                Each quest map has markers on them. They are for the start (or
                end) of the quest, a car park, toilets and a cafe. We recommend
                you use the cafe as a reward for completing the quest. 
              </Typography>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default FAQs;
