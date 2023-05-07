import React from "react";
// Import the `useQuery()` hook from Apollo Client
import { useQuery } from "@apollo/client";
import { styled, Grid, Paper } from "@mui/material";

// Import the query we are going to execute from its file
import { GET_BADGES } from "../utils/queries";

// badge import
// greyscale
import mandurahBadgeGrey from "./../assets/badges/Mandurah_badge_greyscale.png";
import UWABadgeGrey from "./../assets/badges/UWA_badge_greyscale.png";
import badge3Grey from "./../assets/badges/route3_badge_greyscale.png";
import badge4Grey from "./../assets/badges/route4_badge_greyscale.png";
import badge5Grey from "./../assets/badges/route5_badge_greyscale.png";
// colour
import mandurahBadgeColour from "./../assets/badges/Mandurah_badge_colour.png";
import UWABadgeColour from "./../assets/badges/UWA_badge_colour.png";
import badge3Colour from "./../assets/badges/route3_badge_colour.png";
import badge4Colour from "./../assets/badges/route4_badge_colour.png";
import badge5Colour from "./../assets/badges/route5_badge_colour.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BadgeComp = (props) => {
  // Execute the query on component load
  const { loading, data } = useQuery(GET_BADGES);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  

  console.log(data);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Item>
            <img className="badge mandurah" src={data.getBadges.[0].greyscale_image} alt={data.description} />
          </Item>
          <Item>
            <img className="badge uwa" src={UWABadgeGrey} alt="" />
          </Item>
          <Item>
            <img className="badge badge3" src={badge3Grey} alt="" />
          </Item>
          <Item>
            <img className="badge badge4" src={badge4Grey} alt="" />
          </Item>
          <Item>
            <img className="badge badge5" src={badge5Grey} alt="" />
          </Item>
        </Grid>
      )}
    </div>
  );
};

export default BadgeComp;
