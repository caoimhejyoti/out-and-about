import { PlusOutlined } from "@ant-design/icons";

import { Alert, Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_IMAGE } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Modal, Box, Typography } from "@mui/material";
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
  const { Option } = Select;
  const { data } = useQuery(QUERY_ME);

  const [formState, setFormState] = useState({
    image: [],
  });
  const [updateAvatar, { error }] = useMutation(UPDATE_USER_IMAGE);

  // Modal setup
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarModalOpen = () => setAvatarModal(true);
  const avatarModalClose = () => setAvatarModal(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
      console.log(images); //NOTE: reading correctly
      images.push(reader.result);
      console.log(images); //NOTE: reading correctly

      setFormState({
        ...formState,
        image: images,
      });
      console.log(formState); //FIXME: not reading this!
    };
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
            <Form
              onFinish={handleFormSubmit}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 34 }}
              layout="horizontal"
              style={{ Width: 600 }}
            >
              <Form.Item
                // label="Upload Photo"
                name="Upload Photo"
                rules={[
                  {
                    required: true,
                    message: "Please upload at least one photo",
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  onChange={imageHandler}
                  customRequest={dummyRequest}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload your avatar here</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Box>
        </div>
      </Modal>

      {error && (
        <Alert
          message="Your description need to be at least 20 characters and maximum 500 characters long."
          closable
          type="error"
        />
      )}
    </ThemeProvider>
  );
};

export default UpdateAvatar;
