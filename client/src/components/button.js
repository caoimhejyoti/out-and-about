import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "./../style/theme";

export default function BasicButtons(props) {
  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={props.action}
      >
        {props.message}
      </Button>
    </ThemeProvider>
  );
}