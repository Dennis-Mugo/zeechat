import React, { useContext, useState } from "react";
import { ChatteContext } from "../../config/context";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomColors from "../../config/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { textButton } from "../../config/styles";

function UserMenu(props) {
  const navigate = useNavigate();
  const { currentUser, setSelectedBot, handleSignout, selectedBot } =
    useContext(ChatteContext);
  const [anchor, setAnchor] = useState(null);
  const [signoutOpen, setSignoutOpen] = useState(false);

  const handleSignoutOpen = () => setSignoutOpen(true);
  const handleSignoutClose = () => setSignoutOpen(false);

  const open = Boolean(anchor);
  const userInitial = currentUser?.email[0].toUpperCase();

  const handleClose = () => setAnchor(null);

  const handleAvatarClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleSignoutClick = async () => {
    handleClose();
    handleSignoutOpen();
  };

  const confirmSignout = async () => {
    await handleSignout();
    navigate("/home");
  };

  const handleCloseChat = () => {
    setSelectedBot(null);
  };

  return (
    <>
      <IconButton sx={{ margin: "0 20px" }} onClick={handleAvatarClick}>
        <Avatar sx={{ bgcolor: CustomColors.purple }}>{userInitial}</Avatar>
      </IconButton>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchor}
        slotProps={{ style: { width: "90px" } }}
      >
        <MenuItem onClick={handleSignoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <p style={{ fontFamily: "Nunito Sans" }}>Sign Out</p>
          </ListItemText>
        </MenuItem>
        {selectedBot && (
          <MenuItem onClick={handleCloseChat}>
            <ListItemIcon>
              <CloseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <p style={{ fontFamily: "Nunito Sans" }}>Close chat</p>
            </ListItemText>
          </MenuItem>
        )}
        <p
          style={{
            fontFamily: "Nunito Sans",
            margin: "0 10px",
            fontWeight: "bold",
          }}
        >
          {currentUser?.email}
        </p>
      </Menu>
      <Dialog
        open={signoutOpen}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleSignoutClose}
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sign Out?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            style={textButton}
            onClick={handleSignoutClose}
          >
            No
          </Button>
          <Button variant="text" style={textButton} onClick={confirmSignout}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserMenu;
