import React, { useState } from "react";
import Button from "@mui/material/Button";
import { UPDATE_USER_BADGE } from "./../utils/mutations";
import { ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";

import inputTheme from "../style/theme";

export default function QRCodeButtons(props) {
  console.log(props); //used for debugging
  const [userId, setUserId] = useState(props.data._id);
  const [badgeId, setBadgeId] = useState(props.data.currentQuest.badge._id);

  const [updateUserBadge, { error }] = useMutation(UPDATE_USER_BADGE);

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      console.log("Hello - you pressed the button");
      const { data } = await updateUserBadge({
        variables: {
          userId,
          badgeId,
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
