import React, { useContext, useEffect, useState } from "react";
import "./ChatRight.css";
import ChatHeader from "./ChatHeader";
import { ChatteContext } from "../../config/context";
import Banner from "./Banner";
import ChatContent from "./ChatContent";

function ChatRight({ style }) {
  const { selectedBot } = useContext(ChatteContext);
  const [status, setStatus] = useState(selectedBot ? "selected" : "banner");
  //banner, selected

  useEffect(() => {
    setStatus(selectedBot ? "selected" : "banner");
  }, [selectedBot]);

  return (
    <div className="chat_right_container" style={{ ...style }}>
      {status === "selected" ? (
        <>
          <ChatHeader parentStatus={status} />
          <ChatContent parentStatus={status} />
        </>
      ) : status === "banner" ? (
        <Banner />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChatRight;
