import React, { useEffect, useState } from "react";
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

  // badge img use states
  const [mandurahBadge, setMandurahBadge] = useState(mandurahBadgeGrey);
  const [UWABadge, setUWABadge] = useState(UWABadgeGrey);
  const [badgeThree, setBadgeThree] = useState(badge3Grey);
  const [badge4, setBadge4] = useState(badge4Grey);
  const [badge5, setBadge5] = useState(badge5Grey);

  const [userBadges, setUserBadges] = useState([]);

  const badgeList = props?.data.collectedBadges || [];

  useEffect(() => {
    if (userBadges.length !== badgeList.length) {
      const newBadgeList = badgeList.map((el) => {
        const newBadge = el.name;
        return newBadge;
      });
      setUserBadges(newBadgeList);
    }
  }, []);

  useEffect(() => {
    if (userBadges.includes("Mandurah Quest")) {
      setMandurahBadge(mandurahBadgeColour);
    }

    if (userBadges.includes("UWA Quest")) {
      setUWABadge(UWABadgeColour);
    }

    if (userBadges.includes("Badge 3")) {
      setBadgeThree(badge3Colour);
    }

    if (userBadges.includes("Badge 4")) {
      setBadge4(badge4Colour);
    }

    if (userBadges.includes("Badge 5")) {
      setBadge5(badge5Colour);
    }
  });

  // badge description use states
  // const [mandurahBadgeDescription, setMandurahBadgeDescription] = useState(
  //   data.description
  // );
  // const [UWABadgeDescription, setUWABadgeDescription] = useState(
  //   data.description
  // );
  // const [badgeThreeDescription, setBadgeThreeDescription] = useState(badge3Grey);
  // const [badge4Description, setBadge4Description] = useState(badge4Grey);
  // const [badge5Description, setBadge5Description] = useState(badge5Grey);

  // console.log("props:");
  // console.log(props);
  // console.log("collectedBadges:");
  // console.log(props.collectedBadges);
  // console.log("data:");
  // console.log(data);

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
            <img
              className="badge uwa"
              src={mandurahBadge}
              alt=""
              // alt={mandurahBadgeDescription}
            />
          </Item>
          <Item>
            <img
              className="badge uwa"
              src={UWABadge}
              alt=""
              // alt={UWABadgeDescription}
            />
          </Item>
          <Item>
            <img className="badge badgeThree" src={badgeThree} alt="" />
          </Item>
          <Item>
            <img className="badge badge4" src={badge4} alt="" />
          </Item>
          <Item>
            <img className="badge badge5" src={badge5} alt="" />
          </Item>
        </Grid>
      )}
    </div>
  );
};

export default BadgeComp;
