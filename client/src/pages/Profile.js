import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
// CSS/Component Libraries
// import "..style/app.css"; //FIXME: can't find it?
import {
  Card,
  Button,
  styled,
  Box,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
// Components
import EditProfileForm from "../components/Profile/EditProfileForm.js";
import ViewProfileForm from "../components/Profile/ViewProfileForm.js";
import ViewUserOverview from "../components/Profile/ViewUserOverview.js";
// Database queries/mutations
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER_PROFILE } from "../utils/mutations.js";
// Authentication
import Auth from "../utils/auth";

const Profile = () => {
  const navigate = useNavigate();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // user is a initial value of 'data?.me', and setUser updates that value.
  const [userA, setUser] = useState(data && data.me ? data.me : null); // if data.me from the user is true return data.me, and it's false return null, and it cheks the existence of the state variable.
  const [editing, setEditing] = useState(false);

  const user = data?.me;

  const [updateUserProfile, { error }] = useMutation(UPDATE_USER_PROFILE);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSave = async (formData) => {
    // Handle saving the form data here
    try {
      const { data } = await updateUserProfile({
        variables: formData,
      });
      setEditing(false);
      setUser({ ...user, ...formData });
    } catch (err) {
      console.log(err);
      console.log(error.message);
    }
  };

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "Center",
        alignItems: "Center",
        // color: "white",
        // marginTop: "10px",
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
            {`${user.firstName}`}'s Profile!
          </Typography>
        </Box>

        <Box sx={{ gridArea: "sidebar", bgcolor: "white" }}>
          <ViewUserOverview user={user} />
        </Box>

        <Box sx={{ gridArea: "main", bgcolor: "white" }}>
          <Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleEditClick} size="small" color="primary">
                Edit Profile
              </Button>
            </div>
            {/* if 'editing' is false, calls 'handleEditClick' that sets the'editing' state to true again. */}
            {editing ? ( // determines whether the user is editing their profile or not.
              <EditProfileForm
                onSave={handleSave}
                onCancel={handleCancelClick}
                setUser={setUser}
              /> // if editing is true, then this line is rendered. Allowing the user to edit their profile.
            ) : (
              //onSave is called when the user clicks the 'Save' button, and setUser is a function that updates the user.
              <ViewProfileForm />
            )}
          </Item>
        </Box>
      </Box>

      {/* <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <ViewUserOverview user={user} />
                </Card>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={handleEditClick}
                    size="small"
                    color="primary"
                  >
                    Edit Profile
                  </Button>
                </div>
                {/* if 'editing' is false, calls 'handleEditClick' that sets the'editing' state to true again. */}
      {/* {editing ? ( // determines whether the user is editing their profile or not.
        <EditProfileForm
          onSave={handleSave}
          onCancel={handleCancelClick}
          setUser={setUser}
        /> // if editing is true, then this line is rendered. Allowing the user to edit their profile.
      ) : (
        //onSave is called when the user clicks the 'Save' button, and setUser is a function that updates the user.
        <ViewProfileForm />
      )} */}
      {/* </Item>
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </div>
  );
};

export default Profile;
