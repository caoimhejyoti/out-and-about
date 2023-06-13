import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { Form, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "../../style/theme";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

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
  const [formState, setFormState] = useState({ ...props.img });
  console.log(formState); //used for debugging
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarModalOpen = () => setAvatarModal(true);
  const avatarModalClose = () => setAvatarModal(false);

  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const handleChange = (info) => {
    console.log(info); //used for debugging

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originalFileObj, (url) => {
        setLoading(false);
        setImgUrl(url);
      });
    }

  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFormSubmit = async () => {
    console.log(formState);
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
        <Box sx={avatarStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Who are you?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            If you want to update your avatar to your image, you can do that
            here!
          </Typography>
          <Form
            onFinish={handleFormSubmit}
            layout="horizontal"
            style={{ width: 600 }}
          >
            <Form.Item
            //   label="Image Upload"
              name="Image Upload"
              rules={[
                { required: true, message: "Please upload one avatar only." },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                // customRequest={dummyRequest}
              >
                {" "}
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="uploaded avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
