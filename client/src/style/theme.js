import { createTheme } from "@mui/material/styles";

const inputTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Helvetica"],
    h2: {
      color: "white",
      fontWeight: "400",
      fontSize: "2.5rem",
      letterSpacing: 2,
      textAlign: "center",
      "@media (min-width:1000px)": {
        fontSize: "3.7rem",
        textAlign: "left",
      },
      "@media (min-width:1200px)": {
        fontSize: "4rem",
        textAlign: "left",
      },
    },
    h5: {
      fontSize: "1.5rem",
      color: "white",
      textAlign: "center",
      "@media (min-width:900px)": {
        textAlign: "left",
      },
    },
    subtitle1: {
      fontSize: "1rem",
      color: "white",
      textAlign: "center",
      "@media (min-width:900px)": {
        fontSize: "1.2rem",
        textAlign: "left",
      },
      "@media (min-width:1200px)": {
        fontSize: "1.5rem",
        textAlign: "left",
      },
    },
    palette: {
      primary: {
        main: "#981FC2",
      },
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default inputTheme;
