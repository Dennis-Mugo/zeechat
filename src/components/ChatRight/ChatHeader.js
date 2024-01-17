import React, { useContext } from "react";
import "./ChatRight.css";
import { ChatteContext } from "../../config/context";
import { IconButton } from "@mui/material";
import CustomColors from "../../config/colors";
import ChatDrawer from "./ChatDrawer";

function ChatHeader(props) {
  const { screenWidth, currentUser } = useContext(ChatteContext);
  return (
    <div className="chat_header">
      {screenWidth <= 750 ? <ChatDrawer /> : <></>}
    </div>
  );
}

export default ChatHeader;
