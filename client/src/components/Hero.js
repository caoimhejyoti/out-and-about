import React from "react";
import { Button, Box, Card, CardMedia } from "@mui/material";
import heroImg from "../assets/hero.png";

const styles = {
  paperContainer: {
    backgroundImage: `url(${heroImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "1000",
  },
};

const Hero = () => {
  return (
    <section>
      <div>
        <div style={styles.paperContainer}>
          <Button color="primary" variant="contained">
            Sign up today!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
