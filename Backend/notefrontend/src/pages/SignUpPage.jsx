import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import login from "../assets/login.png";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Notes App by Srishti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  minWidth: "80%",
  minHeight: "80%",
});

const defaultTheme = createTheme();

export default function SignUpPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/create-account",
        {
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something is Wrong refresh the page");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} md={6}>
          <ButtonBase
            sx={{ width: "100%", height: "85%", marginTop: "100px" }}
          >
            <Img alt="complex" src={login} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              margin: "6rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                value={inputs.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={inputs.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={inputs.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: "3.125rem", mb: "2.5rem" }} // Converted from 3rem and 2.5rem to rem
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    {"Already have an account? Sign In"}
                  </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: "3.125rem" }} />{" "}
              {/* Converted from 5rem to rem */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
