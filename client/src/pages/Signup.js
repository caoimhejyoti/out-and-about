import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

  // Code for furture development - adding avatar when signing up.
  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const imageHandler = (value) => {
    value?.event?.preventDefault();

    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").file[0];

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert img to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
    // const imgFile = value.file.originalFileObj;

    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   console.log(reader.result); //used for debugging
    //   let output = document.getElementById('uploadedImg');
    //   output.src = reader.result;
    //   let images = [...formState.image];
    //   images.push(reader.result);

    //   setFormState({
    //     ...formState,
    //     image: images,
    //   });
    // };
    // reader.readAsDataURL(imgFile);
  };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  return (
    <main className="flex-row justify-center mb-4 signup-container">
      <div className="col-12 col-lg-10 ">
        <div className="card flex">
          <h4 className="card-header bg-dark text-light p-2">
            Sign Up{" "}
            <Link to="/login" className="ml-5">
              ← Go to Login
            </Link>
          </h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
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
                {/* <Upload
                  listType="picture-circle"
                  type="file"
                  className="avatar-uploader"
                  customRequest={dummyRequest}
                  onChange={imageHandler}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload avatar here</div>
                  </div>
                  {/* {uploadButton} */}
                {/*</Upload> */}
                <button
                  className="btn btn-block btn-primary"
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
