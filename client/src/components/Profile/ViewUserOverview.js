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

const ViewUserImage = ({ user }) => {
  console.log(user);
  const userImg = user.image;

  return (
    <div>
      <CardActionArea>
        <CardMedia component="img" image={userImg} alt="User avatar" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${user.username}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since June 21, 2023
            {/* {`${user.createdAt}`} */}
            {/* FIXME: date is incorrect */}
            {/* TODO: update date based on user logged in */}
          </Typography>
          <Typography variant="h6" marginY={2} color="text.secondary">
            {user.currentQuest && user.currentQuest.tierName
              ? `${user.currentQuest.tierName}`
              : "Tier does not exist"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <AvatarBtn></AvatarBtn>
      <DelBtn></DelBtn>
    </div>
  );
};

export default ViewUserImage;
