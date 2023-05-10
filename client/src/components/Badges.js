import React, { useEffect, useState } from "react";
// Import the `useQuery()` hook from Apollo Client
import { useQuery } from "@apollo/client";
import { styled, Paper, Box } from "@mui/material";

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
  padding: theme.spacing(1),
  textAlign: "center",
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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            maxWidth: 380,
            maxHeight: 500,
          }}
        >
          <Item>
            <img
              className="badge uwa"
              src={mandurahBadge}
              alt="Mandurah Badge"
            />
          </Item>
          <Item>
            <img className="badge uwa" src={UWABadge} alt="UWA Badge" />
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
        </Box>
      )}
    </div>
  );
};

export default BadgeComp;
