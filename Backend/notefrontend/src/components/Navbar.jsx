import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentLogin } from "../redux/slice/authSlice";
import { clearNotes } from "../redux/slice/noteSlice";
import CreateIcon from '@mui/icons-material/Create';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector(selectCurrentLogin);

  const handlelogout = () => {
    dispatch(logOut());
    dispatch(clearNotes());
    navigate("/");
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: "#060b26", height: "8vh" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <CreateIcon sx={{ fontSize: "4vh" }} />
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, fontSize: "2.5vh" }}
            onClick={() => {
              navigate("/");
            }}
          >
            KeepNotes
          </Typography>
          {!login && (
            <Button
              sx={{ fontSize: "1.8vh", padding: "1.5vh" }}
              onClick={() => {
                navigate("/login");
              }}
              color="inherit"
            >
              Sign In
            </Button>
          )}
          {!login && (
            <Button
              sx={{ fontSize: "1.8vh", padding: "1.5vh" }}
              onClick={() => {
                navigate("/signup");
              }}
              color="inherit"
            >
              Sign Up
            </Button>
          )}
          {login && (
            <Button onClick={handlelogout} color="inherit">
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
