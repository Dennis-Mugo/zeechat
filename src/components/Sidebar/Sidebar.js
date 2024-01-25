import React, { useContext } from "react";
import "./Sidebar.css";

import logo from "../../assets/logo_transparent.png";

import BotList from "./BotList";
import { ChatteContext } from "../../config/context";
import NewBotModal from "./NewBotModal";

function Sidebar({ style, closeDrawer }) {
  const { createDefaultBots, currentUser } = useContext(ChatteContext);

  return (
    <div className="sidebar_container" style={{ ...style }}>
      <NewBotModal closeDrawer={closeDrawer} />
      <BotList closeDrawer={closeDrawer} />
    </div>
  );
}

export default Sidebar;
