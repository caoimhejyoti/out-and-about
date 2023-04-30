// import url from "https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@300&family=Josefin+Sans:wght@600&family=Open+Sans:ital,wght@0,300;0,500;0,800;1,300;1,500;1,800&family=Rock+Salt&display=swap";
import { createTheme } from "@mui/material/styles";

const inputTheme = createTheme({
  typography: {
    fontFamily: ["Rock Salt", "Josefin Sans"],
  },
  palette: {
    primary: {
      main: "#01463c",
    },
  },
});

export default inputTheme;
