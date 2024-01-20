import React, { useContext } from "react";
import "./Sidebar.css";

import logo from "../../assets/logo_transparent.png";
import { Button } from "@mui/material";
import { buttonStyle } from "../../config/styles";
import CustomColors from "../../config/colors";
import AddIcon from "@mui/icons-material/Add";
import BotList from "./BotList";
import { ChatteContext } from "../../config/context";

function Sidebar({ style, closeDrawer }) {
  const { createDefaultBots, currentUser } = useContext(ChatteContext);
  return (
    <div className="sidebar_container" style={{ ...style }}>
      <div className="side_new flex_center">
        <Button
          onClick={async () => {
            // await createDefaultBots(currentUser);
          }}
          startIcon={<AddIcon sx={{ color: CustomColors.purple }} />}
          variant="contained"
          style={{
            textTransform: "none",
            fontFamily: "Nunito Sans",
            fontSize: "17px",
            backgroundColor: CustomColors.pureWhite,
            color: CustomColors.purple,
            height: "60px",
            borderRadius: "30px",
          }}
        >
          Create new bot
        </Button>
      </div>
      <BotList closeDrawer={closeDrawer} />
    </div>
  );
}

export default Sidebar;
