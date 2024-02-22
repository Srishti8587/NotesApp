import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ArchiveIcon from "@mui/icons-material/Archive";
import PaletteIcon from "@mui/icons-material/Palette";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slice/authSlice";
import axios from "axios";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { archiveNote, deleteNote, updateNotes } from "../redux/slice/noteSlice";
import {
  Box,
  Button,
  InputBase,
  Modal,
  Stack,
  TextField,
} from "@mui/material";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjust as needed
  height: "80%", // Adjust as needed
  bgcolor: "background.paper",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  borderRadius: "0.4375rem",
  overflow: "auto",
  flexGrow: "1",
  p: 2,
};

export default function NoteCard({ note }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const handleClose = () => {
    handleEdited(note._id);
    setOpen(false);
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

  const data = note.content;
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  const handleArchive = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:4000/api/v1/note/archived-notes/${id}`,
        config
      );
      if (response.data.success) {
        dispatch(archiveNote(id));
        alert(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Can't archive the Note");
    }
  };


 const handleDelete = async (id) => {
    console.log(id);
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:4000/api/v1/note/delete-notes/${id}`,
        config
      );
      if (response.data.success) {
        dispatch(deleteNote(id));
        alert(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Can't delete the Note");
    }
  };

  const getCharacterLimit = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 960) {
      return 400;
    } else if (screenWidth >= 600) {
      return 300;
    } else {
      return 200;
    }
  };



  

  const handleEdit = (note) => {
    setOpen(true);
    setInputs({
      title: note.title,
      content: note.content,
    });
  };

  const handleEdited = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const response = await axios.patch(
        `http://localhost:4000/api/v1/note/update-notes/${id}`,
        {
          title: inputs.title,
          content: inputs.content,
        },
        config
      );

      if (response.data.success) {
        dispatch(updateNotes(response.data.data));
      } else {
        console.log(response.data.message);
      }
      setOpen(false);
    } catch (error) {
      console.log("Error while editing the note");
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          right: "0",
          margin: "10%", // Converted from 16px to rem
        }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                background: "#060b26",
                borderRadius: "0.625rem", // Converted from 10px to rem
                padding: "0.5rem", // Converted from 8px to rem
                margin: "0.625rem", // Converted from 10px to rem
              }}
            >
              <Stack
                direction={"row"}
                spacing={2}
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
            <Stack spacing={3} sx={{ margin: "1.25rem" }}>
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
                sx={{ border: "none", borderBottom: "none" }}
              />
              <Button
                sx={{
                  position: "fixed",
                  bottom: "0",
                  right: "0",
                  padding: "0.8125rem", // Converted from 13px to rem
                }}
                onClick={() => handleEdited(note._id)}
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>

      <Card sx={{ width: "100%", height: "100%" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={note.title}
          subheader={formatDate(note.updatedAt)}
        />
        <CardContent sx={{ wordWrap: "break-word" }}>
          {data && (
            <Typography variant="body2" color="text.secondary">
              {data.slice(0,getCharacterLimit())}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <ModeEditOutlineIcon onClick={() => handleEdit(note)} />
          </IconButton>

          <IconButton onClick={() => handleDelete(note._id)} aria-label="share">
            <DeleteSweepIcon />
          </IconButton>
          <IconButton
            onClick={() => handleArchive(note._id)}
            aria-label="share"
          >
            <ArchiveIcon />
          </IconButton>
          <Button sx={{fontSize:"60%"}} onClick={() => handleEdit(note)}>Read More..</Button>
        </CardActions>
      </Card>
    </>
  );
}
