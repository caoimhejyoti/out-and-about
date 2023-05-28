import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import "./../index.css";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    city: "Perth",
    questStatus: true,
    riddleStatus: false,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

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
    <div className="card flex">
      <div className="card-body">
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
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
            <button
              className="btn btn-block"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
