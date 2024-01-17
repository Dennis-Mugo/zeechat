import React, { useContext } from "react";
import CustomColors from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { ChatteContext } from "../../config/context";

function Logo({ style, link }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(ChatteContext);

  const handleNavigate = () => {
    if (!link) return;
    if (!currentUser) {
      navigate("/home");
    } else {
      navigate("/chat");
    }
  };
  return (
    <h2
      onClick={handleNavigate}
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
