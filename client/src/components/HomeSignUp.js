import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Button } from "@mui/material";
import "./../index.css";

import Auth from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    image: [],
    city: "Perth",
    questStatus: true,
    riddleStatus: false,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  // const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState); //used for debugging

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card flex m-3">
      <div className="card-body">
        {data ? (
          <p>
            Success! You may now head to your
            <Link to="/dashboard"> dashboard</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="First Name"
              name="firstName"
              type="text"
              value={formState.firstName}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="Last Name"
              name="lastName"
              type="text"
              value={formState.lastName}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="Username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button
              className="btn btn-block btn-primary"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Sign up
            </Button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
      <Button
        onClick={() => navigate("/login")}
        className="m-1 text-white"
        size="small"
      >
        Login
      </Button>
      {/* </h4> */}
    </div>
  );
};

export default Signup;
