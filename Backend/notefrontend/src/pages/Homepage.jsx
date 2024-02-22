// import styled from "@emotion/styled";
import React from "react";
import front1 from "../assets/front1.jpg";
// import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../style/HomePage.css'

const Homepage = () => {
  return (
    <>
        <div className="home" style={{ backgroundImage: `url(${front1})` }}>
        <div className="headerContainer">
          <h1>Let's Keep Notes</h1>
          <p>Start strong, <br/>study smart,<br/> and succeed effortlessly<br/> with our innovative note-taking app.</p>
          <Link to="/signup">
            <button>Try Now</button>
          </Link>
        </div>
      </div>  
    </>
  );
};

export default Homepage;
