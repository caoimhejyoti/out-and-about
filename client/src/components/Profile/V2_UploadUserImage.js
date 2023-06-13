import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Spin, Upload } from "antd";

import { Button, Modal, Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "../../style/theme";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER_IMAGE } from "../../utils/mutations";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";

const avatarStyle = {
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

export default function AvatarBtn(props) {
  console.log(props); //used for debugging

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [user, setUser] = useState(data && data.me ? data.me : null); // if data.me from the user is true return data.me, and it's false return null, and it cheks the existence of the state variable.

  // Modal setup
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarModalOpen = () => setAvatarModal(true);
  const avatarModalClose = () => setAvatarModal(false);

  const [imgState, setImgState] = useState({
    image: [],
  });
  //   console.log(imgState); //used for debugging

  const [updateUserAvatar, { error }] = useMutation(UPDATE_USER_IMAGE);

  const imgHandler = (value) => {
    value?.event?.preventDefault();
    const preview = document.querySelector("avatar");

    const file = value.file.originalFileObj;

    const reader = new FileReader();

    // reader.addEventListener(
    //     "load",
    //     ()=> {
    //         preview.src = reader.result;
    //     },
    //     false
    // )

    reader.onloadend = () => {
      console.log(reader.result); //used for debugging
      var images = [...imgState.image];
      images.push(reader.result);

      setImgState({
        ...imgState,
        image: images,
      });
    };
    // if (file) {
      reader.readAsDataURL(file);
    // } else {
    //   console.log("no file");
    // }
  };

  const handleImgSubmit = async (value) => {
    console.log(imgState); //used for debugging

    try {
      const { data } = await updateUserAvatar({
        variables: { imgState },
      });
      avatarModalClose();
    } catch (err) {
      console.error(err);
      console.log(error.message);
    }
  };

  const dummyReq = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={avatarModalOpen}
      >
        Avatar Btn
      </Button>
      <Modal
        open={avatarModal}
        onClose={avatarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={avatarStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Who are you?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              If you want to update your avatar to your image, you can do that
              here!
            </Typography>
            <Upload.Dragger
              multiple={false}
              className="avatar"
              listType="picture"
              action={"http://localhost:3000/"}
              accept=".jpg, .png"
                beforeUpload={(file) => {
                  console.log({ file });
                  return true;
                }}
              iconRender={() => {
                return <Spin></Spin>;
              }}
              progress={{
                strokeWidth: 3,
                strokeColor: {
                  "0%": "#E35680",
                  "100%": "#FE904E",
                },
                style: { top: 12 },
              }}
              onChange={imgHandler}
              customRequest={dummyReq}
            >
              Drag avatar here or
              <br />
              <Button>Upload</Button>
            </Upload.Dragger>
          </Box>
          <Button onClick={handleImgSubmit}>Update your avatar</Button>
        </div>
      </Modal>
    </ThemeProvider>
  );
}
