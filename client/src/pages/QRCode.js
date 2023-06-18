import React, { useState } from "react";
import {
  Typography,
  Grid,
  Container,
  Box,
  Button,
  TextField,
} from "@mui/material";
import QRButton from "./../components/qrcode_button";

import { QUERY_ME, QUERY_USER } from "../utils/queries";
import { UPDATE_USER_QRSTATUS } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import Map from "./../components/maps/map";
import Auth from "../utils/auth";
import "./../style/badge.css";

const mapTestStyle = {
  height: "430px",
  padding: "20px",
};

const btn = {
  message: `Click here to mark this quest as complete!`,
};

function displayBadge(user) {
  const badgeImage = user.currentQuest.badge.colour_image;
  const badgeDescription = user.currentQuest.badge.description;
  return <img src={badgeImage} alt={badgeDescription} className="badge-img" />;
}

const QRCode = () => {
  // find user current tier
  const [formState, setFormState] = useState({ qrpass: "" });
  const [error, setError] = useState(false);

  const { username: userParam } = useParams();
  const [updateQRPass] = useMutation(UPDATE_USER_QRSTATUS);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me;
  const QRCodeScanned = data?.me.QRStatus || false;
  const currentPassword = data?.me.currentQuest.questPass;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const errorMessage = "Invalid Password, Please Try Again!";

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formState.qrpass);
    if (formState.qrpass === currentPassword) {
      const { data } = await updateQRPass({
        variables: { userId: user._id, userStatus: QRCodeScanned },
      });
      setError(false);
    } else {
      setError(true);
    }
    setFormState({ qrpass: "" });
  };

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "Center",
        alignItems: "Center",
        marginBottom: "20px",
        maxWidth: "75%",
        color: "white",
      }}
    >
      {/* {qrCodeScanned ? (
        <h1> this is a test</h1>
      ) : ( */}
      {/* <Grid> */}
      <Box
        className="my-5"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"header header header header" "sidebar main main main" `,
        }}
      >
        {/* <Container>{displayBadge(user)}</Container> */}
        {QRCodeScanned ? (
          <>
            <Box sx={{ gridArea: "header" }}>
              <Typography gutterBottom variant="h4" color="white">
                Congratulations you have achieved the{" "}
                {user.currentQuest.badge.name} Badge!
              </Typography>
            </Box>
            <Box sx={{ gridArea: "sidebar" }} className="badge-side">
              {displayBadge(user)}
            </Box>
            <Box sx={{ gridArea: "main", bgcolor: "white" }} className="p-3">
              <Map data={user} />
              <br />
              <Typography variant="p" color="black">
                You are now able to see the next riddle but don't stop yet!
                Finish your quest by making it to the end and celebrating with a
                well deserved coffee!
              </Typography>
              <br />
              <QRButton data={user} message={btn.message}></QRButton>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ gridArea: "header" }}>
              <Typography gutterBottom variant="h4" color="white">
                Find a QR Code to get the Password!
              </Typography>
            </Box>
            <Box sx={{ gridArea: "sidebar" }} className="badge-side">
              {displayBadge(user)}
            </Box>
            <Box sx={{ gridArea: "main", bgcolor: "white" }} className="p-3">
              <Typography gutterBottom variant="p" color="black">
                Scan the QR Code on your to get the password{" "}
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="text"
                  id="qrpass"
                  name="qrpass"
                  label="QR Code Password"
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                  value={formState.qrpass}
                  onChange={handleChange}
                />
                <Button variant="contained" type="primary">
                  Submit Password
                </Button>
              </form>
            </Box>
            {error === true ? (
              <>
                <div className="my-3 p-3 bg-danger text-white">
                  {errorMessage}
                </div>
              </>
            ) : null}
          </>
        )}
      </Box>
    </div>
  );
};

export default QRCode;
