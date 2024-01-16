import React, { useContext } from "react";
import CustomColors from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { ChatteContext } from "../../config/context";

function Logo({ style }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(ChatteContext);

  const handleNavigate = () => {
    if (!currentUser) {
      navigate("/home");
    } else {
      navigate("/chat");
    }
  };
  return (
    <h2
      style={{
        color: CustomColors.deepPurple,
        fontFamily: "Mooli",
        cursor: "pointer",
        ...style,
      }}
    >
      ZeeChat
    </h2>
  );
}

export default Logo;
