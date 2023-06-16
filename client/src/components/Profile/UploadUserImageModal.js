import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
// Database queries/mutations
import { UPDATE_USER_IMAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
// CSS/Component Libraries
import { PlusOutlined } from "@ant-design/icons";
import { Alert, Form, Upload } from "antd";
import { Modal, Button, Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "../../style/theme";

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

const UpdateAvatar = (props) => {
  const { data } = useQuery(QUERY_ME);

  const [formState, setFormState] = useState({
    userId: data?.me?._id,
    image: [],
  });
  const [updateAvatar, { error }] = useMutation(UPDATE_USER_IMAGE);

  // Modal setup
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarModalOpen = () => setAvatarModal(true);
  const avatarModalClose = () => setAvatarModal(false);

  // Managing Img Upload
  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const imageHandler = (value) => {
    value?.event?.preventDefault();

    const file = value.file.originFileObj;

    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);

      var images = [...formState.image];
      images.push(reader.result);

      setFormState({
        ...formState,
        image: images,
      });
    };
    console.log(formState);
    reader.readAsDataURL(file);
  };

  // submit form
  const handleFormSubmit = async (value) => {
    value?.event?.preventDefault();
    console.log(formState);
    try {
      const { data } = await updateAvatar({
        variables: { ...formState },
      });
      avatarModalClose();
    } catch (e) {
      console.error(e);
    }
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
        Update Avatar
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
            <Form onFinish={handleFormSubmit}>
              <Form.Item
                name="Upload Photo"
                rules={[
                  {
                    required: true,
                    message: "Please upload one photo",
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  onChange={imageHandler}
                  customRequest={dummyRequest}
                  className="primary m-4"
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload your avatar here</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                <Button
                  variant="contained"
                  id="submit-button"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            {error && (
              <Alert
                onChange={{ avatarModalClose }}
                message="Your avatar cannot be used. Please upload a different avatar."
                closable
                type="error"
              />
            )}
          </Box>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default UpdateAvatar;
