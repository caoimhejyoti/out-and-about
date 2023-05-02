import * as React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  styled,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bgAbstract from "../assets/cards/bg_abstract.jpeg";
import { GradeOutlined, Grade } from "@mui/icons-material";

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam} = useParams();
  
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });


    const user = data?.me;
    

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam){
      return <Navigate to="/me" />;
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }

    if (false) {
      return (
        <h4>
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      );
    }
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    })); 

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "Left",
          alignItems: "Left",
          color: "white",
        }}
      >
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* Start of left column user card */}
              <Grid item xs={4}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={bgAbstract}
                        alt="abstract background"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {`${user.username}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Member since May 1, 2023
                          {/* TODO: update date based on user logged in */}
                        </Typography>
                        <Typography variant="overline" color="text.secondary">
                         {userParam ? `${user.currentTier.name}: ${user.currentTier.description}`: 'No tier found'}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Edit Profile
                        {/* TODO: update this button to allow info to be edited */}
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
              {/* End of left column user card */}
              {/* Start of right column */}
              <Grid item xs={8}>
                <Item
                  style={{
                    textAlign: "Left",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Progress
                  </Typography>
                </Item>
                <Item>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Level 1 - Pedestrian</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Item>STAR</Item>
                        <Item>STAR 2</Item>
                        <Item>STAR 2</Item>
                        <Item>STAR 2</Item>
                        <Item>STAR 2</Item>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disabled>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Level 2 - Rambler</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disabled>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>Level 3 - Wanderer</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion disabled>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>Level 4 - Nomad</Typography>
                    </AccordionSummary>
                  </Accordion>
                </Item>
              </Grid>
  
              {/* End of right column */}
            </Grid>
          </Box>
        </div>
    </div>
  );
}
                      



 export default Profile;
