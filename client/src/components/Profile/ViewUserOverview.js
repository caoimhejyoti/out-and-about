import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
// CSS/Component Libraries
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
// Database queries/mutations
import { DELETE_USER_PROFILE } from "../../utils/mutations";
// import { QUERY_ME } from "../../utils/queries";

// Components
import AvatarBtn from "./UploadUserImage";

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
  console.log(user.user);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [deleteUserProfile, { delError }] = useMutation(DELETE_USER_PROFILE);
  const [delModal, setDelModal] = useState(false);
  const accountModalOpen = () => setDelModal(true);
  const accountModalClose = () => setDelModal(false);

  const userImg = user.user.image;

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
        <CardMedia component="img" image={userImg} alt="User avatar" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${user.user.username}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since May 11, 2023
            {`${user.user.createdAt}`}
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
