import React, { useState } from "react";
import { Typography, Box, TextField } from "@mui/material";
import FormControl from "@mui/base/FormControl";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const ViewProfileForm = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me;

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
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
  // onSave when the user submits the form, to save the changes. setUser used to pass the updated 'formData'.
  return (
    <Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5" component="div">
          View My Profile
        </Typography>
      </div>

      <Box
        sx={{
          // width: 500,
          maxWidth: "100%",
        }}
      >
        <FormControl>
          <TextField
            fullWidth="true"
            margin="normal"
            id="outlined-required"
            label="First Name"
            defaultValue={user.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth="true"
            margin="normal"
            id="outlined-required"
            label="Last Name"
            defaultValue={user.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth="true"
            margin="normal"
            id="outlined-required"
            label="Username"
            defaultValue={user.username}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth="true"
            margin="normal"
            id="outlined-required"
            label="Email Address"
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default ViewProfileForm;
