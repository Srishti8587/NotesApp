import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slice/authSlice";
import { selectAllArchived, selectAllNotes, setArchiveNotes } from "../redux/slice/noteSlice";
import ArchiveCard from "../components/ArchiveCard";

const Archive = () => {
  const archivedNotes = useSelector(selectAllArchived);
  const token = useSelector(selectCurrentToken);
  const notes = useSelector(selectAllNotes);
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
          "http://localhost:4000/api/v1/note/allarchived-notes",
          config
        );
        if (response.data.success) {
          dispatch(setArchiveNotes(response.data.data));
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Error while getting archived notes");
      }
    };
    fetchNotes();
  }, [token, dispatch,notes,archivedNotes]);

  return (
    <Box sx={{ flexGrow: 1, padding: "2%", marginTop: "10vh" }}>
      {archivedNotes && archivedNotes.length > 0 ? (
        <Grid container spacing={3}>
          {archivedNotes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <ArchiveCard note={note} />
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
        <Typography variant="h6">Haven't Archived any Note Yet</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Archive;
