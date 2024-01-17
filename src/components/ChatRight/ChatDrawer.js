import { IconButton, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CustomColors from "../../config/colors";
import Sidebar from "../Sidebar/Sidebar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Logo from "../Logo/Logo";

function ChatDrawer(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex_center" style={{ border: "1px solid black" }}>
        <IconButton sx={{ margin: "0 10px" }} onClick={handleOpen}>
          <MenuIcon sx={{ color: CustomColors.dark1 }} />
        </IconButton>
      </div>
      <SwipeableDrawer
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="left"
        PaperProps={{
          sx: { width: "300px" },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Logo style={{ marginRight: "10px" }} />
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <Sidebar />
      </SwipeableDrawer>
    </>
  );
}

export default ChatDrawer;
