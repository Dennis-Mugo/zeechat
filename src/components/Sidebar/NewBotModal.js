import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, IconButton, Modal, TextField, Tooltip } from "@mui/material";
import { CustomTextField, buttonStyle } from "../../config/styles";
import CustomColors from "../../config/colors";
import AddIcon from "@mui/icons-material/Add";
import "./NewBotModal.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { avatarUrls, getRandomAvatar } from "../../config/constants";
import { LoadingButton } from "@mui/lab";
import { ChatteContext } from "../../config/context";

function NewBotModal({ closeDrawer }) {
  const { createBot, screenWidth } = useContext(ChatteContext);
  const widthBreak = 600;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (closeDrawer) closeDrawer();
    handleOpen();
  };

  const defaultNameHelper = "Give your bot a name";
  const defaultDescriptionHelper =
    "Give a short decription of your bot. Eg A travel planner";
  const defaultInstructionHelper =
    "Give your bot the instructions it should follow";
  const [photoUrl, setPhotoUrl] = useState(getRandomAvatar());
  const [nameHelper, setNameHelper] = useState(defaultNameHelper);
  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState("");

  const [descHelper, setDescHelper] = useState(defaultDescriptionHelper);
  const [descError, setDescError] = useState(false);
  const [description, setDescription] = useState("");

  const [instHelper, setInstHelper] = useState(defaultInstructionHelper);
  const [instError, setInstError] = useState(false);
  const [instruction, setInstruction] = useState("");

  const [saveLoading, setSaveLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName("");
    setNameError(false);
    setNameHelper(defaultNameHelper);

    setDescription("");
    setDescError(false);
    setDescHelper(defaultDescriptionHelper);

    setInstruction("");
    setInstError(false);
    setInstHelper(defaultInstructionHelper);
    setOpen(false);
  };

  const handleNameChange = (e) => {
    let maxLength = 20;
    let value = e.target.value;
    setNameError(false);
    if (value.length > maxLength) {
      return;
    }

    setNameHelper(defaultNameHelper);
    setName(value);
  };

  const handleNameBlur = () => {
    if (!name.length) {
      setNameHelper("Name is required!");
      setNameError(true);
      return true;
    }
    return false;
  };

  const handleNameFocus = () => {
    setNameError(false);
    setNameHelper(defaultNameHelper);
  };

  const handleDescChange = (e) => {
    let maxLength = 30;
    let value = e.target.value;
    setDescError(false);
    if (value.length > maxLength) return;
    setDescHelper(defaultDescriptionHelper);
    setDescription(value);
  };

  const handleDescBlur = () => {
    if (!description.length) {
      setDescHelper("A description is required!");
      setDescError(true);
      return true;
    }
    return false;
  };

  const handleDescFocus = () => {
    setDescError(false);
    setDescHelper(defaultDescriptionHelper);
  };

  const handleInstChange = (e) => {
    let value = e.target.value;
    setInstError(false);
    setInstHelper(defaultInstructionHelper);
    setInstruction(value);
  };

  const handleInstBlur = () => {
    if (!instruction.length) {
      setInstHelper("This field is required!");
      setInstError(true);
      return true;
    }
    return false;
  };

  const handleInstFocus = () => {
    setInstError(false);
    setInstHelper(defaultInstructionHelper);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSave();
  };
  const handleSave = async () => {
    if (handleNameBlur() || handleDescBlur() || handleInstBlur()) return;
    setSaveLoading(true);
    await createBot({
      name,
      description,
      content: instruction,
      photoUrl,
      dateCreated: Date.now().toString(),
      role: "system",
    });
    setSaveLoading(false);
    handleClose();
  };

  return (
    <>
      <div className="side_new flex_center">
        <Button
          onClick={handleClick}
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

      <Modal
        open={open}
        onClose={handleClose}
        disableRestoreFocus={true}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="new_bot_container">
          <div className="new_bot_header_wrapper">
            <h3>Create New Bot</h3>
            <div className="close_modal_container">
              <Tooltip title="Close" placement="bottom">
                <IconButton onClick={handleClose}>
                  <CloseRoundedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="new_bot_content_container">
            <AvatarChoice selected={photoUrl} select={setPhotoUrl} />
            <form className="new_bot_form" onSubmit={handleFormSubmit}>
              <CustomTextField
                label="Name"
                //   inputRef={nameInputRef}
                autoFocus
                helperText={nameHelper}
                inputProps={{
                  style: {
                    fontFamily: "Nunito",
                    color: CustomColors.dark1,
                  },
                }}
                sx={{
                  marginBottom: "15px",
                  width: screenWidth < widthBreak ? "90%" : "70%",
                }}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                value={name}
                error={nameError}
                onChange={handleNameChange}
              />
              <CustomTextField
                label="Description"
                helperText={descHelper}
                inputProps={{
                  style: {
                    fontFamily: "Nunito",
                    color: CustomColors.dark1,
                  },
                }}
                sx={{
                  marginBottom: "15px",
                  width: screenWidth < widthBreak ? "90%" : "70%",
                }}
                onFocus={handleDescFocus}
                onBlur={handleDescBlur}
                value={description}
                error={descError}
                onChange={handleDescChange}
              />
              <CustomTextField
                label="Instructions"
                helperText={instHelper}
                inputProps={{
                  style: {
                    fontFamily: "Nunito",
                    color: CustomColors.dark1,
                  },
                }}
                sx={{
                  marginBottom: "15px",
                  width: screenWidth < widthBreak ? "90%" : "70%",
                }}
                onFocus={handleInstFocus}
                onBlur={handleInstBlur}
                value={instruction}
                error={instError}
                onChange={handleInstChange}
                multiline
                minRows={5}
                maxRows={5}
              />
              <LoadingButton
                variant="contained"
                loading={saveLoading}
                onClick={handleSave}
                style={{
                  ...buttonStyle,
                  margin: "15px 0",
                  width: screenWidth < widthBreak ? "90%" : "70%",
                  height: "60px",
                  borderRadius: "30px",
                  backgroundColor: !saveLoading
                    ? CustomColors.purple
                    : CustomColors.dark2,
                  color: !saveLoading
                    ? CustomColors.pureWhite
                    : CustomColors.transparent,
                }}
              >
                {saveLoading ? "Saving" : "Done"}
              </LoadingButton>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

const AvatarChoice = ({ select, selected }) => {
  const handleAvatarClick = (url) => {
    select(url);
  };
  return (
    <div className="avatar_choice_container">
      <div className="avatar_choice_wrapper">
        {avatarUrls.map((url) => (
          <div
            key={url}
            className="avatar_list_item"
            onClick={() => handleAvatarClick(url)}
          >
            <img
              src={url}
              className="list_image"
              style={{
                border: `5px solid ${
                  selected === url
                    ? CustomColors.deepPurple
                    : CustomColors.pureWhite
                }`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewBotModal;
