import React, { useState } from "react";
import { Typography, Grid, Container, ThemeProvider } from "@mui/material";
import Button from "./../components/qrcode_button";
import inputTheme from "../style/theme";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import MandurahMap from "./../components/maps/mandurah-forshore";
import UwaMap from "./../components/maps/uwa-grad";
import Auth from "../utils/auth";
import "./../style/badge.css";

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
};

// const btnClick = (user) => async (e) => {
//   e.preventDefault();

//   console.log("Hello - you pressed the button");
//   // get badge name and id
//   const badgeName = user.currentQuest.badge.name;
//   const badgeId = user.currentQuest.badge._id;

//   // get username and id
//   const username = user.username;
//   const userId = user._id;

//   console.log(`badge name: ` + badgeName);
//   console.log(`badge id: ` + badgeId);
//   console.log(`username: ` + username);
//   console.log(`user id: ` + userId);
//   // add badge to user

//   const [updateUserBadge, { error }] = useMutation(UPDATE_USER_BADGE);

//   try {
//     const { data } = updateUserBadge({
//       variables: {
//         userId,
//         badgeId,
//       },
//     });

//     console.log("successful");
//     window.location.href = "/dashboard";
//   } catch (err) {
//     console.error(err);
//   }
// };

function displayBadge(user) {
  const badgeImage = user.currentQuest.badge.colour_image;
  const badgeDescription = user.currentQuest.badge.description;
  // console.log("displaybadge fnc"); //used for debugging
  // console.log(badgeImage); //used for debugging
  // console.log(badgeDescription); //used for debugging
  return <img src={badgeImage} alt={badgeDescription} className="badge-img" />;
}

function whichMap(user) {
  // console.log("whichMap fnc"); //used for debugging
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
}

const QRCode = () => {
  // find user current tier
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  
  const user = data?.me;
  console.log(user); //used for debugging

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/qrcode" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to="/login" />;
  }
  return (
    <Container style={containerStyle}>
      <ThemeProvider theme={inputTheme}>
        <Grid className="col-12 col-md-8 flex-column justify-center">
          <h1 style={testStyle}>QRCode testing</h1>
        </Grid>
        <Grid style={containerStyle}>
          <Container className="badge-container">
            {displayBadge(user)}
          </Container>
          <Typography style={testStyle}>
            Congratulations you have achieved the {user.currentQuest.badge.name}{" "}
            Badge.
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
            <Button
              data={user}
              message={btn.message}
              // btnClick={btnClick}
            ></Button>
          </Container>
        </Grid>
      </ThemeProvider>
    </Container>
  );
};

export default QRCode;
