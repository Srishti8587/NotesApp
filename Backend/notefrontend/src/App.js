import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";

function App() {
  return (
    <>
      <Stack >
        <Navbar />
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
