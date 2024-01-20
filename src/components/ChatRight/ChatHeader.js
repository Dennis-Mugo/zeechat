import React, { useContext } from "react";
import "./ChatRight.css";
import { ChatteContext } from "../../config/context";
import { Avatar, IconButton } from "@mui/material";
import CustomColors from "../../config/colors";
import ChatDrawer from "./ChatDrawer";
import { mainWidthBreak } from "../../config/constants";
import Logo from "../Logo/Logo";
import UserMenu from "./UserMenu";

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
        <div className="chat_header_wrapper_left">
          {selectedBot ? (
            <>
              <Avatar
                src={selectedBot?.photoUrl}
                sx={{
                  backgroundColor: CustomColors.grey300,
                  margin: `0 20px 0 ${
                    screenWidth <= mainWidthBreak ? "0" : "20px"
                  }`,
                }}
              />
              <div className="">
                <h4 className="bot_item_name">{selectedBot?.name}</h4>
                <p className="bot_item_desc">{selectedBot?.description}</p>
              </div>
            </>
          ) : (
            <Logo
              style={{
                color: CustomColors.purple,
                margin: `0 20px 0 ${
                  screenWidth <= mainWidthBreak ? "0" : "20px"
                }`,
              }}
            />
          )}
        </div>
        <div className="chat_header_wrapper_right">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
