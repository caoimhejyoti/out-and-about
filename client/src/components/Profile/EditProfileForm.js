import React, { useState } from "react";
import { Typography, Box, TextField } from "@mui/material";

// onSave when the user submits the form, to save the changes. setUser used to pass the updated 'formData'.
const EditProfileForm = ({ onSave, onCancel, setUser }) => {
  const [formData, setFormData] = useState({
    // using the hook to create 'formData' object.
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    //handlechange function that updtes the 'formData' when a user types something in the form.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //This function calls the 'onSave' function, passing the 'formData' obj as an arg. It also calls the 'setUser' function.
    e.preventDefault();
    onSave(formData);
    setUser(formData); // Pass the form data to profile page
  };

  const handleCancel = (e) => {
    //This function calls the 'onSave' function, passing the 'formData' obj as an arg. It also calls the 'setUser' function.
    e.preventDefault();
    onCancel(formData);
  };

  // Returning JSX that renders form with input fields. The 'value' is set to the 'formData' obj, and the 'onChange' is set to 'handleChange' function.
  return (
    <Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5" component="div">
          Editing My Profile
        </Typography>
      </div>
      <Box
        sx={{
          // width: 500,
          maxWidth: "100%",
        }}
      >
        <form>
          <TextField
            type="text"
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            type="text"
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />

          <TextField
            type="text"
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            type="email"
            id="email"
            name="email"
            label="Email Adress"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            type="password"
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
          <button type="submit" onClick={handleCancel}>
            Cancel Changes
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
