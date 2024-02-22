import React, { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slice/authSlice";
import { selectAllArchived, selectAllNotes, setAllNotes } from "../redux/slice/noteSlice";

const MyNotes = () => {
  const token = useSelector(selectCurrentToken);
  const notes = useSelector(selectAllNotes);
  const archivedNotes = useSelector(selectAllArchived);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:4000/api/v1/note/get-notes",
          config
        );
        if (response.data.success) {
          dispatch(setAllNotes(response.data.data));
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Error while getting notes");
      }
    };

    fetchNotes();
  }, [token, dispatch,notes,archivedNotes]);

  return (
    <Box sx={{ flexGrow: 1, padding: "2%" ,marginTop:"10vh" }}>
      {notes && notes.length > 0 ? (
        <Grid container spacing={3}>
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
        <Typography variant="h6">Haven't created any Note Yet</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyNotes;
