import Uwamap from "./uwa-grad"
import MandurahMap from "./mandurah-forshore"
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

export default function Map() {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { username: userParam },
      });

    const tier = data.me.currentQuest.tierName;

    console.log(tier);

    if(tier === 'Pedestrian') {
        return MandurahMap();
    }
    else if(tier === 'Rambler') {
        return Uwamap();
    } else return (
        <div>
          <h2>You Have Completed All Available Quests! Come Back Soon</h2>
        </div>
      );
}