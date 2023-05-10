import Uwamap from "./uwa-grad"
import MandurahMap from "./mandurah-forshore"
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

export default function Map(props) {
    // const { username: userParam } = useParams();
    // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //     variables: { username: userParam },
    //   });
    //   useEffect(() => {
    //     console.log("Run something");
    //  }, []);

    console.log(props);
    const tier = props.data.currentQuest.tierName;
    console.log(tier);

    // if(loading) {
    //   return <h1>Loading...</h1>
    // }
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