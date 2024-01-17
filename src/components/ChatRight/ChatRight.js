import React from "react";
import "./ChatRight.css";
import ChatHeader from "./ChatHeader";

function ChatRight({ style }) {
  return (
    <div className="chat_right_container" style={{ ...style }}>
      <ChatHeader />
    </div>
  );
}

export default ChatRight;
