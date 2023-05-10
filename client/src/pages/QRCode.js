import React, { useState } from "react";
import { Typography, Grid, Container } from "@mui/material";
import Button from "./../components/qrcode_button";

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
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        color: "white",
      }}
    >
      {/* {qrCodeScanned ? (
        <h1> this is a test</h1>
      ) : ( */}
      <Grid>
        <Container>{displayBadge(user)}</Container>
        {QRCodeScanned ? (
          <>
            <Typography>
              Congratulations you have achieved the{" "}
              {user.currentQuest.badge.name} Badge.
              <br />
              You are now able to see the next riddle but don't stop yet!
              <br />
              Finish your quest by making it to the end and celebrating with a
              well deserved coffee!
            </Typography>
            <Container className="map-container" style={mapTestStyle}>
              <Map data={user} />
            </Container>
            <Container className="justify-center text-center">
              <Button data={user} message={btn.message}></Button>
            </Container>
          </>
        ) : (
          <>
            <h2>Find a QR Code to get the Password!</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Secret Password"
                name="qrpass"
                type="text"
                value={formState.qrpass}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-primary"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </form>
            {error === true ? (
              <>
                <div className="my-3 p-3 bg-danger text-white">
                  {errorMessage}
                </div>
              </>
            ) : null}
          </>
        )}
      </Grid>
    </div>
  );
};

export default QRCode;
