import React, { useState, useEffect } from "react";
import { Typography, Grid, Container, ThemeProvider } from "@mui/material";
import Button from "./../components/qrcode_button";
import inputTheme from "../style/theme";
import { QUERY_ME, QUERY_USER, CHECK_QR } from "../utils/queries";
import { UPDATE_USER_QRSTATUS } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import MandurahMap from "./../components/maps/mandurah-forshore";
import UwaMap from "./../components/maps/uwa-grad";
import Map from "./../components/maps/map";
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
  height: "430px",
  padding: '20px',
};

const btn = {
  message: `Click here to mark this quest as complete!`,
};



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
  switch (user.currentQuest.name) {
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
  const [formState, setFormState] = useState({ qrpass: ""});
  const [error, setError] = useState(false);

  const { username: userParam } = useParams();
  const [updateQRPass, err] = useMutation(UPDATE_USER_QRSTATUS);

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
        variables: { userId: user._id,
        userStatus: QRCodeScanned },
      });
      setError(false);
    } else {
      setError(true);
    } 
    setFormState({qrpass: ""});
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
    <Container style={containerStyle}>
      <ThemeProvider theme={inputTheme}>
      {/* {qrCodeScanned ? (
        <h1> this is a test</h1>
      ) : ( */}
        <Grid style={containerStyle}>
          <Container className="badge-container">
            {displayBadge(user)}
          </Container>
          {QRCodeScanned ? (
          <><Typography style={testStyle}>
            Congratulations you have achieved the {user.currentQuest.badge.name}{" "}
            Badge.
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
            <Button
              data={user}
              message={btn.message}
            ></Button>
          </Container></>
          ) : (
            <><h2>Find a QR Code to get the Password!</h2>
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
                ) : (null)}
            </>
          )}
        </Grid>

      </ThemeProvider>
    </Container>
  );
};

export default QRCode;
