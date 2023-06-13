import React, { useState } from "react";
import {
  // Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Box,
  // styled,
  // Box,
  // Paper,
  // Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import defaultIcon from "../../assets/avatar_icon.png";
import { useQuery, useMutation } from "@apollo/client";
import {
  UPDATE_USER_PROFILE,
  DELETE_USER_PROFILE,
  UPDATE_USER_IMAGE,
} from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import AvatarBtn from "./V3_UploadUserImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewUserImage = (user) => {
  console.log(user.user.image);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [deleteUserProfile, { delError }] = useMutation(DELETE_USER_PROFILE);
  const [updateUserimage, { imgError }] = useMutation(UPDATE_USER_IMAGE);
  const [delModal, setDelModal] = useState(false);
  const accountModalOpen = () => setDelModal(true);
  const accountModalClose = () => setDelModal(false);

  const [userImg, setUserImg] = useState(user.user.image);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDelClick = async () => {
    if (user.user.email === formState.email) {
      const { data } = await deleteUserProfile({
        variables: { Id: user.user._id },
      });
      navigate("/signup");
    }
  };

  return (
    <div>
      <CardActionArea>
        {/* TODO: update img based on user img */}
        <CardMedia
          component="img"
          image={defaultIcon}
          // image={userImg}
          alt="default user icon, with a purple compass as a head."
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${user.user.username}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since May 11, 2023
            {/* TODO: update date based on user logged in */}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            {user.currentQuest && user.currentQuest.tierName
              ? `${user.user.currentQuest.tierName}`
              : "Tier does not exist"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <AvatarBtn data={userImg}></AvatarBtn>
      <Button onClick={accountModalOpen}>Delete Your Account</Button>
      <Modal
        open={delModal}
        onClose={accountModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wait!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete your whole account? You will loose
            all your achievements. The riddles. The Badges. Oh the Badges!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            If you are completely sure (sniff), confirm by typing in your email
            in below
          </Typography>
          <form onSubmit={handleDelClick}>
            <input
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Delete it all
            </button>
          </form>
          <Button onClick={accountModalClose}>I made a mistake!</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewUserImage;
