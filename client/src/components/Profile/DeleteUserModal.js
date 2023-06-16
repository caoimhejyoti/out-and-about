import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
// Database queries/mutations
import { DELETE_USER_PROFILE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
// CSS/Component Libraries
import { PlusOutlined } from "@ant-design/icons";
import { Alert, Form, Input } from "antd";
import { Modal, Button, Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import inputTheme from "../../style/theme";

const DeleteStyle = {
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

const DeleteUser = () => {
  console.log();
  const navigate = useNavigate();
  const [deleteUserProfile, { delError }] = useMutation(DELETE_USER_PROFILE);
  const [delModal, setDelModal] = useState(false);
  const accountModalOpen = () => setDelModal(true);
  const accountModalClose = () => setDelModal(false);

  const { data } = useQuery(QUERY_ME);

  const [formState, setFormState] = useState({
    userId: data?.me?._id,
    correctEmail: data?.me?.email,
    email: "",
  });
  console.log(formState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // console.log(formState); //used for debugging

  const handleDelClick = async () => {
    // console.log("formstate email", formState.email); //used for debugging
    if (formState.correctEmail === formState.email) {
      const { data } = await deleteUserProfile({
        variables: { Id: formState.userId },
      });
      navigate("/signup");
    } else {
      console.log("FAILED DELETE");
      console.error();
    }
    //FIXME: add alert
  };

  return (
    <ThemeProvider theme={inputTheme}>
      <Button
        variant="contained"
        id="submit-button"
        sx={{ width: "25vw" }}
        className="primary m-2"
        onClick={accountModalOpen}
      >
        Delete Account
      </Button>
      <Modal
        open={delModal}
        onClose={accountModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={DeleteStyle}>
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
          <Form onFinish={handleDelClick}>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                variant="contained"
                id="submit-button"
                type="primary"
                htmlType="submit"
              >
                Delete my account
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={accountModalClose} size="small" variant="text">
            Abort!
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteUser;
