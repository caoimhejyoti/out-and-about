import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "./../style/theme";

export default function BasicButtons(props) {
  // console.log(props); //used for debugging

  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={props.btnClick(props.data)}
      >
        {props.message}
      </Button>
    </ThemeProvider>
  );
}
