import React, { useState } from "react";
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

import { Navigate, useParams} from "react-router-dom";
import { useQuery } from "@apollo/client";
import EditProfileForm from '../components/EditProfileForm.js';


import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";


const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // user is a initial value of 'data?.me', and setUser updates that value.
  const [user, setUser] = useState(data && data.me ? data.me : null); // if data.me from the user is true return data.me, and it's false return null, and it cheks the existence of the state variable. 
  const [editing, setEditing] = useState(false);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!) {
  //   return (
  //     <h4>
  //       You need to be logged in to see your profile page. Use the navigation
  //       links above to sign up or log in!
  //     </h4>
  //   );
  // }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleEditClick = () => {
    setEditing(true);
  };
  
  const handleSave = (formData) => {
      // Handle saving the form data here
    console.log(formData);
    setEditing(false);

    setUser({ ...user, ...formData });
  }; // Reset the editing state
    
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
                       {user.currentTier ? `${user.currentTier.name}: ${user.currentTier.description}` : 'Tier does not exist'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {editing ? ( // determines whether the user is editing their profile or not.
                      <EditProfileForm onSave={handleSave} setUser={setUser} /> // if editing is true, then this line is rendered. Allowing the user to edit their profile.
                    ) : ( //onSave is called when the user clicks the 'Save' button, and setUser is a function that updates the user. 
                      <Button onClick={handleEditClick} size="small" color="primary">
                        Edit Profile
                      </Button> // if 'editing' is false, calls 'handleEditClick' that sets the 'editing' state to true again.
                    )}
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
};

export default Profile;
