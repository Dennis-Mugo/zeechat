import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../../assets/logo_transparent.png";
import { buttonStyle } from "../../config/styles";
import Logo from "../../components/Logo/Logo";

function Home(props) {
  const navigate = useNavigate();
  const [bannerText, setBannerText] = useState("");
  // const bannerPrompt = "Help me pick an outfit that will look good on camera";
  const bannerPrompt =
    "Plan a surprise family picnic in your local park, complete with games and activities for all ages. What’s on the menu, and how will you keep everyone entertained?";

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count <= bannerPrompt.length) {
        setBannerText(bannerPrompt.slice(0, count) + "●");
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="home_container">
      <div className="home_left">
        <div className="home_logo flex_center">
          <img src={logo} style={{ maxWidth: "200px" }} />
        </div>
        <div className="home_banner">
          {/* <h2>Recommend a dish to impress a date who's a picky eater●</h2> */}
          <h2>{bannerText}</h2>
        </div>
        {/* <p>Recommend a dish to impress a date who's a picky eater</p> */}
      </div>
      <div className="home_right">
        <h2 className="home_right_title">Get started</h2>
        <div className="home_right_actions">
          <Button
          onClick={() => {navigate("/signin")}}
          variant="contained"
            style={{
              ...buttonStyle,
              borderRadius: "25px",
              minWidth: "80px",
              height: "50px",
              width: "100%",
              flex: "1",
              marginRight: "10px",
              marginBottom: "15px"
            }}
          >
            Login
          </Button>
          <Button
          onClick={() => {navigate("/signup")}}
          variant="contained"
            style={{
              ...buttonStyle,
              width: "100%",
              borderRadius: "25px",
              minWidth: "80px",
              height: "50px",
              flex: "1",
              marginRight: "10px",
              marginBottom: "15px"
            }}
          >
            Sign up
          </Button>
        </div>
        <div className="home_right_footer">
            <img width="30px" style={{marginRight: "10px"}} src={logo} />
            <Logo />
        </div>
      </div>
    </div>
  );
}

export default Home;
