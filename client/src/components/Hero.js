import React from "react";
import { Button} from "@mui/material";

const btnStyles = {
  marginBottom: "45px",
  backgroundColor: "white",
  color: "#981FC2"
};

const Hero = () => {
  return (
    <section>
          <Button style={btnStyles } variant="contained">
            Sign up today!
          </Button>
    </section>
  );
};

export default Hero;
