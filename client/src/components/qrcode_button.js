import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  UPDATE_USER_BADGE,
  UPDATE_STATUS,
  UPDATE_USER_QUEST,
  UPDATE_USER_TIER,
  UPDATE_USER_QRSTATUS,
} from "./../utils/mutations";
import { ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";

import inputTheme from "../style/theme";

export default function QRCodeButtons(props) {
  const navigate = useNavigate();
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
      setQuestId("3903F035BD71FEACE920026B");
    } else if (props.data.currentQuest.tierName === "Wayfairer") {
      setQuestId("CDF03DC475E0381FFD940DBE");
    } else if (props.data.currentQuest.tierName === "Traveller") {
      setQuestId("A117EAA4E2C4E76971E40D99");
    } else if (props.data.currentQuest.tierName === "Explorer") {
      setQuestId("53D8B93AAFE44A0C786D3676");
    }
  }, [props]);

  useEffect(() => {
    if (props.data.currentQuest.tierName === "Pedestrian") {
      setTierId("7124BB7DFC7DFD8E013F54D6");
    } else if (props.data.currentQuest.tierName === "Rambler") {
      setTierId("648e89f61b3efc617d0905cb");
    } else if (props.data.currentQuest.tierName === "Wayfairer") {
      setTierId("648e89f61b3efc617d0905cc");
    } else if (props.data.currentQuest.tierName === "Traveller") {
      setTierId("648e89f61b3efc617d0905cd");
    } else if (props.data.currentQuest.tierName === "Explorer") {
      setTierId("648e89f61b3efc617d0905ce");
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
        variables: { userId: props.data._id, userStatus: props.data.QRStatus },
      });

      console.log("successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        type="primary"
        id="submit-button"
        fullWidth={false}
        className="primary m-2"
        onClick={btnClick}
      >
        {props.message}
      </Button>
    </ThemeProvider>
  );
}
