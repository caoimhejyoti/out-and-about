import Uwamap from "./uwa-grad";
import MandurahMap from "./mandurah-forshore";
import KingsParkMap from "./kings-park";
import FremantleMap from "./fremantle";
import FalconMap from "./falcon.js";
import React from "react";

export default function Map(props) {
  console.log(props);
  const tier = props.data.currentQuest.tierName;
  console.log(tier);

  if (tier === "Pedestrian") {
    return MandurahMap();
  } else if (tier === "Rambler") {
    return Uwamap();
  } else if (tier === "Wayfairer") {
    return KingsParkMap();
  } else if (tier === "Traveller") {
    return FremantleMap();
  } else if (tier === "Explorer") {
    return FalconMap();
  } else
    return (
      <div>
        <h2>You Have Completed All Available Quests! Come Back Soon</h2>
      </div>
    );
}
