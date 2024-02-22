import React from "react";
import Sidebar from "./Sidebar";
// import NotesPage from "../pages/NotesPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentLogin } from "../redux/slice/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
// import Screen from "./Screen";

const MainArea = () => {
  const login = useSelector(selectCurrentLogin);
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };
  return (
    <>
      {login ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10}>
              <Box sx={{ margin: "6% 4% 2% 4%" }}>
                  <Outlet/>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Typography>Please login to see the notes!! </Typography>
          <Button onClick={gotoLogin}>Go to login</Button>
        </Box>
      )}
    </>
  );
};

export default MainArea;
