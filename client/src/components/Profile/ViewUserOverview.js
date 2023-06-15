import React from "react";
// CSS/Component Libraries
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Components
import AvatarBtn from "./UploadUserImageModal";
import DelBtn from "./DeleteUserModal";

const ViewUserImage = (user) => {
  const userImg = user.user.image;

  return (
    <div>
      <CardActionArea>
        <CardMedia component="img" image={userImg} alt="User avatar" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${user.user.username}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since May 11, 2023
            {/* {`${user.user.createdAt}`} FIXME: date is incorrect */}
            {/* TODO: update date based on user logged in */}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            {user.user.currentQuest && user.user.currentQuest.tierName
              ? `${user.user.currentQuest.tierName}`
              : "Tier does not exist"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <AvatarBtn data={userImg}></AvatarBtn>
      <DelBtn data={user}></DelBtn>
    </div>
  );
};

export default ViewUserImage;
