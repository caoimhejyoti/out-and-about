import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  UPDATE_USER_BADGE,
  UPDATE_STATUS,
  UPDATE_USER_QUEST,
  UPDATE_USER_TIER,
  UPDATE_USER_QRSTATUS
} from "./../utils/mutations";
import { ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";

import inputTheme from "../style/theme";

export default function QRCodeButtons(props) {
  const [userId, setUserId] = useState(props.data._id);
  const [badgeId, setBadgeId] = useState(props.data.currentQuest.badge._id);
  const [riddle, setRiddle] = useState(false);
  const [quest, setQuest] = useState(true);
  const [questId, setQuestId] = useState();
  const [tierId, setTierId] = useState();

  const [updateUserBadge, { error }] = useMutation(UPDATE_USER_BADGE);
  const [updateStatus, { er }] = useMutation(UPDATE_STATUS);
  const [updateUserQuest, { e }] = useMutation(UPDATE_USER_QUEST);
  const [updateUserTier, { x }] = useMutation(UPDATE_USER_TIER);
  const [updateQRPass, err] = useMutation(UPDATE_USER_QRSTATUS); 

  useEffect(() => {
    if (props.data.currentQuest.tierName === "Pedestrian") {
      setQuestId("EFE0C59EFA61B1C366BB9515");
    } else if (props.data.currentQuest.tierName === "Rambler") {
      setQuestId("53D8B93AAFE44A0C786D3676");
    }
  }, [props]);

  useEffect(() => {
    if (props.data.currentQuest.tierName === "Pedestrian") {
      setTierId("7124BB7DFC7DFD8E013F54D6");
    } else if (props.data.currentQuest.tierName === "Rambler") {
      setTierId("E39F5CFA950068B644C1ED2A");
    }
  }, [props]);

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      console.log("Hello - you pressed the button");
      const { data } = await updateUserBadge({
        variables: {
          userId,
          badgeId,
        },
      });
      console.log("status Query");
      const { statusData } = await updateStatus({
        variables: {
          userId,
          quest,
          riddle,
        },
      });
      console.log("update Query");
      const { questData } = await updateUserQuest({
        variables: {
          userId,
          questId,
        },
      });
      console.log("update Tier");
      const { tierData } = await updateUserTier({
        variables: {
          userId,
          tierId,
        },
      });
      const { QRData } = await updateQRPass({
        variables: { userId: props.data._id,
        userStatus: props.data.QRStatus },
      });

      console.log("successful");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={btnClick}
      >
        {props.message}
      </Button>
    </ThemeProvider>
  );
}
