import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  styled,
  Box,
  Paper,
  Grid,
} from "@mui/material";

import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import EditProfileForm from "../components/Profile/EditProfileForm.js";
import ViewProfileForm from "../components/Profile/ViewProfileForm.js";
import bgAbstract from "../assets/cards/bg_abstract.jpeg";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import {
  UPDATE_USER_PROFILE,
  DELETE_USER_PROFILE,
} from "../utils/mutations.js";

import Auth from "../utils/auth";

const Profile = () => {
  const navigate = useNavigate();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // user is a initial value of 'data?.me', and setUser updates that value.
  const [user, setUser] = useState(data && data.me ? data.me : null); // if data.me from the user is true return data.me, and it's false return null, and it cheks the existence of the state variable.
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // console.log(user);

  const [updateUserProfile, { error }] = useMutation(UPDATE_USER_PROFILE);
  const [deleteUserProfile, { delError }] = useMutation(DELETE_USER_PROFILE);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDelClick = async () => {
    const { data } = await deleteUserProfile({
      variables: {Id: user._id},
    })
    navigate("/signup");
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
      console.log(data);
      setEditing(false);
      setUser({ ...user, ...formData });
    } catch (err) {
      console.log(err);
      console.log(error.message);
    }
  }; // Reset the editing state

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to="/login" />;
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
        justifyContent: "Center",
        alignItems: "Center",
        color: "white",
        marginTop: "10px",
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
                        Member since May 11, 2023
                        {/* TODO: update date based on user logged in */}
                      </Typography>
                      <Typography variant="overline" color="text.secondary">
                        {user.currentQuest && user.currentQuest.tierName
                          ? `${user.currentQuest.tierName}`
                          : "Tier does not exist"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button onClick={handleDelClick}>Delete Your Account</Button>
                </Card>
              </Item>
            </Grid>
            {/* End of left column user card */}
            {/* Start of right column */}
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
            </Grid>

            {/* End of right column */}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
