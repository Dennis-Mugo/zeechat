import React from "react";
import "./Banner.css";
import ChatHeader from "./ChatHeader";
import bannerImg from "../../assets/banner.png";
import TypeWriter from "../TypeWriter/TypeWriter";
import CustomColors from "../../config/colors";
import Logo from "../Logo/Logo";

function Banner(props) {
  const bannerText =
    "I am ZeeChat. I give you the flexibility to create your own custom AI bots. You can create as many specialized bots as you would like.";
  return (
    <div className="banner_container">
      <ChatHeader parentStatus="banner" />
      <div className="banner_scroll">
        <div className="flex_center banner_img_wrapper">
          <img src={bannerImg} style={{ height: "50vh" }} />
        </div>
        <div className="banner_text_wrapper">
          <TypeWriter
            text={bannerText}
            style={{
              color: CustomColors.dark3,
              fontFamily: "Nunito",
            }}
          />
        </div>
        <div className="flex_center banner_footer">
          <Logo style={{ fontSize: "14px", color: CustomColors.grey400 }} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
