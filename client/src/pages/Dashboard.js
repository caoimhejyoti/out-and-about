import React, { useState } from "react";
import { Typography, styled, Box, Paper } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./../style/app.css";
import BadgeComp from "./../components/Badges";

// map import
import Map from "../components/maps/map";
import Riddle from "../components/Riddle";

const Dashboard = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me;

  console.log("user:");
  console.log(user);

  const [answerComplete, setAnswerComplete] = useState(false);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  const handleCorrect = () => {
    console.log("That answer was correct");
    setAnswerComplete(true);
  };

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
        justifyContent: "Center",
        alignItems: "Center",
        marginBottom: "20px",
        maxWidth: "75%",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"header header header header"
  "sidebar main main main"`,
        }}
      >
        <Box sx={{ gridArea: "header" }}>
          <Typography gutterBottom variant="h4" color="white">
            Welcome {`${user.firstName}`}!
          </Typography>
        </Box>

        <Box sx={{ gridArea: "sidebar" }}>
          <Item>
            <Typography gutterBottom variant="h5">
              My Badges
            </Typography>
            <hr />
            <Typography gutterBottom variant="caption">
              Current Tier: {user.currentQuest.tierName}
            </Typography>
            <BadgeComp data={user} />
          </Item>
        </Box>

        <Box sx={{ gridArea: "main", bgcolor: "white" }}>
          {/* if 'editing' is false, calls 'handleEditClick' that sets the'editing' state to true again. */}
          {answerComplete ? ( // determines whether the user is editing their profile or not.
            <Map data={user} className="mr-5" /> // if answercomplete is true, the map will be rendered
          ) : (
            <Riddle
              user={user}
              onSave={handleCorrect}
              renderMap={setAnswerComplete}
            /> // if answercomplete is false, the riddle will be rendered
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
