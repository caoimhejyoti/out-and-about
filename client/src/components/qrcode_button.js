import React, {useState} from "react";
import Button from "@mui/material/Button";
import { UPDATE_USER_BADGE } from "./../utils/mutations";
import { ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";

import inputTheme from "../style/theme";

export default function QRCodeButtons(props) {
  console.log(props); //used for debugging
  const [username, setUsername] = useState(props.data.username)
  const [badgeName, setBadgeName] = useState(props.data.currentQuest.badge.name)

  const [updateUserBadge, { error }] = useMutation(UPDATE_USER_BADGE);

  const btnClick = async (e) => {
    e.preventDefault();
  
    console.log("Hello - you pressed the button");
  
    try {
      const { data } = updateUserBadge({
        variables: {
          username,
          badgeName,
        },
      });
  
      console.log("successful");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };
  


  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={btnClick}
      >
        {props.message}
      </Button>
    </ThemeProvider>
  );
}
