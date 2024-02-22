import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import PaletteIcon from "@mui/icons-material/Palette";
import MyNotes from "./MyNotes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  selectAllArchived,
  selectAllNotes,
} from "../redux/slice/noteSlice";
import {
  selectCurrentLogin,
  selectCurrentToken,
} from "../redux/slice/authSlice";

const NotesPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const token = useSelector(selectCurrentToken);
  const archivedNotes = useSelector(selectAllArchived);
  const login = useSelector(selectCurrentLogin);
  const notes = useSelector(selectAllNotes);

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    handleCreate();
    setOpen(false);
  };

  useEffect(() => {}, [notes, archivedNotes]);

  const handleCreate = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/v1/note/create-notes",
        {
          title: inputs.title,
          content: inputs.content,
        },
        config
      );
      if (response.data.success) {
        dispatch(addNote(response.data.data));
        setOpen(false);
        alert(response.data.message);
        setInputs({ title: "", content: "" });
      } else {
        setOpen(false);
        alert(response.data.message);
        setInputs({ title: "", content: "" });
      }
    } catch (error) {
      console.log(error);
      alert("Error in creating the note, try again later");
      setOpen(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChangeTitle = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleChangeContent = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      content: e.target.value,
    }));
  };

  return (
    <>
      {login && (
        <Box sx={{ width: "100%", minHeight: "100vh", position: "relative" }}>
          <Box>
            <MyNotes />
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: "2vh",
              right: "1vw",
              zIndex: 9999,
            }}
          >
            <IconButton
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleOpen}
            >
              <AddCircleIcon
                sx={{ color: isHovered ? "grey" : "black", fontSize: "5rem" }}
              />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: "43.75rem",
                  height: "80%",
                  bgcolor: "background.paper",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  borderRadius: "0.4375rem",
                  overflow: "auto",
                  p: "1rem",
                }}
              >
                <Box
                  sx={{
                    background: "#060b26",
                    borderRadius: "0.625rem",
                    padding: "0.5rem",
                    margin: "0.625rem",
                  }}
                >
                  <Stack
                    direction={"row"}
                    spacing="0.625rem"
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItem: "flex-end",
                    }}
                  >
                    <ArchiveIcon sx={{ color: "white" }} />
                    <PaletteIcon sx={{ color: "white" }} />
                    <Button sx={{ color: "white" }} onClick={handleClose}>
                      Close
                    </Button>
                  </Stack>
                </Box>
                <Stack spacing="1.875rem" sx={{ margin: "5%" }}>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    onChange={handleChangeTitle}
                    value={inputs.title}
                  />
                  <InputBase
                    multiline
                    fullWidth
                    placeholder="Take a Note..."
                    maxRows={6}
                    onChange={handleChangeContent}
                    value={inputs.content}
                    sx={{ border: "none", borderBottom: "none" }} // Custom styles to remove the underline
                  />
                  <Button
                    sx={{
                      position: "fixed",
                      bottom: "1.25rem",
                      right: "1.25rem",
                      padding: "0.8125rem",
                    }}
                    onClick={handleCreate}
                  >
                    Create Note..
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NotesPage;
