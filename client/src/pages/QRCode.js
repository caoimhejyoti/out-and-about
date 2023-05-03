import React, { useState } from "react";
import { Typography, Grid, Container, ThemeProvider } from "@mui/material";
import Button from "./../components/button";
import inputTheme from "../style/theme";
import { QUERY_ME, QUERY_QUEST, QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import MandurahMap from "./../components/maps/mandurah-forshore";
import UwaMap from "./../components/maps/uwa-grad";
import Auth from "../utils/auth";

const testStyle = {
  color: "white",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
};

const mapTestStyle = {
  height: "400px",
  margin: "1rem",
};

const btn = {
  message: `Click here to mark this quest as complete!`,
  action: btnAction,
};

function addBadge() {
  // find out current quest map.
  // mutate database to add current map badge to user.
}

function btnAction() {
  alert("hello");
  // add badge to user
  // go to dashboard
  // dashboard needs to render with riddle set up.
}

// function displayBadge(user) {
//   console.log("displaybadge fnc");
//   switch (user.currentTier.name) {
//     case 1:
//       return <MandurahMap />;
//       break;
//     case 2:
//       return <UwaMap />;
//       break;
//     default:
//       return <MandurahMap />;
//       break;
//   }
// }

function whichMap(user) {
  console.log("whichMap fnc");
  switch (user.currentTier.name) {
    case 1:
      return <MandurahMap />;
      break;
    case 2:
      return <UwaMap />;
      break;
    default:
      return <MandurahMap />;
      break;
  }

  // if current tier is 1 - show mandurah map
  // if current tier is 2 - show UWA map
}

const QRCode = () => {
  // const [currentQuest, setcurrentQuest] = useState([]);

  // find user current tier - needs to be global?
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me;
  console.log(user);


  // const {userQuest} = useQuery(QUERY_QUEST, {
  //   variables: { user:user, tier: user.currentTier._id },
  // });
 
  // console.log(userQuest);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={containerStyle}>
      <ThemeProvider theme={inputTheme}>
        <Grid className="col-12 col-md-8 flex-column justify-center">
          <h1 style={testStyle}>QRCode testing</h1>
        </Grid>
        <Grid>
          {/* <Container>{displayBadge}</Container> */}
          <Typography style={testStyle}>
            Congratulations you have achieved the *** Badge.
            <br />
            You are now able to see the next riddle but don't stop yet!
            <br />
            Finish your quest by making it to the end and celebrating with a
            well deserved coffee!
          </Typography>
          {/* <Container style={testStyle}>Test text</Container> */}
          <Container className="map-container" style={mapTestStyle}>
            {whichMap(user)}
          </Container>
          <Container className="justify-center">
            <Button message={btn.message} onClick={btn.action}></Button>
          </Container>
        </Grid>
      </ThemeProvider>
    </Container>
  );
};

export default QRCode;
