import React, { useContext } from "react";
import "./ChatRight.css";
import { ChatteContext } from "../../config/context";
import { Avatar, IconButton } from "@mui/material";
import CustomColors from "../../config/colors";
import ChatDrawer from "./ChatDrawer";
import { mainWidthBreak } from "../../config/constants";
import Logo from "../Logo/Logo";
import UserMenu from "./UserMenu";
import EditBotModal from "./EditBotModal";

function ChatHeader({ parentStatus }) {
  const { screenWidth, currentUser, selectedBot } = useContext(ChatteContext);

  return (
    <div className="chat_header">
      {screenWidth <= mainWidthBreak ? (
        <ChatDrawer style={{ flex: 5 }} />
      ) : (
        <></>
      )}
      <div className="chat_header_wrapper">
        <EditBotModal />
        <div className="chat_header_wrapper_right">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
