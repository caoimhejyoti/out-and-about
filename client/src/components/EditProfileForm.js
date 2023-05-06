import React, { useState } from 'react';

// onSave when the user submits the form, to save the changes. setUser used to pass the updated 'formData'.
const EditProfileForm = ({ onSave, setUser }) => { 
  const [formData, setFormData] = useState({ // using the hook to create 'formData' object.
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => { //handlechange function that updtes the 'formData' when a user types something in the form.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => { //This function calls the 'onSave' function, passing the 'formData' obj as an arg. It also calls the 'setUser' function.
    e.preventDefault();
    onSave(formData);
    setUser(formData); // Pass the form data to profile page
  };

  // Returning JSX that renders form with input fields. The 'value' is set to the 'formData' obj, and the 'onChange' is set to 'handleChange' function.
  return ( 
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfileForm;

  
  
  