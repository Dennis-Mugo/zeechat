import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import { CustomTextField, buttonStyle } from "../../config/styles";
import CustomColors from "../../config/colors";
import AddIcon from "@mui/icons-material/Add";
import "../Sidebar/NewBotModal.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  avatarUrls,
  getRandomAvatar,
  mainWidthBreak,
} from "../../config/constants";
import { LoadingButton } from "@mui/lab";
import { ChatteContext } from "../../config/context";
import Logo from "../Logo/Logo";

function EditBotModal({ closeDrawer }) {
  const { updateBot, screenWidth, selectedBot } = useContext(ChatteContext);
  const widthBreak = 600;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (!selectedBot) return;
    if (closeDrawer) closeDrawer();
    handleOpen();
  };

  const defaultNameHelper = "Give your bot a name";
  const defaultDescriptionHelper =
    "Give a short decription of your bot. Eg A travel planner";
  const defaultInstructionHelper =
    "Give your bot the instructions it should follow";
  const [photoUrl, setPhotoUrl] = useState(selectedBot?.photoUrl);
  const [nameHelper, setNameHelper] = useState(defaultNameHelper);
  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState(selectedBot?.name);

  const [descHelper, setDescHelper] = useState(defaultDescriptionHelper);
  const [descError, setDescError] = useState(false);
  const [description, setDescription] = useState(selectedBot?.description);

  const [instHelper, setInstHelper] = useState(defaultInstructionHelper);
  const [instError, setInstError] = useState(false);
  const [instruction, setInstruction] = useState(selectedBot?.content);

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (!selectedBot) {
      setPhotoUrl("");
      setName("");
      setNameError(false);
      setNameHelper(defaultNameHelper);

      setDescription("");
      setDescError(false);
      setDescHelper(defaultDescriptionHelper);

      setInstruction("");
      setInstError(false);
      setInstHelper(defaultInstructionHelper);
    } else {
      setPhotoUrl(selectedBot?.photoUrl);
      setName(selectedBot?.name);
      setNameError(false);
      setNameHelper(defaultNameHelper);

      setDescription(selectedBot?.description);
      setDescError(false);
      setDescHelper(defaultDescriptionHelper);

      setInstruction(selectedBot?.content);
      setInstError(false);
      setInstHelper(defaultInstructionHelper);
    }
  }, [selectedBot]);

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
    console.log(selectedBot?.botId);
    await updateBot(
      {
        name,
        description,
        content: instruction,
        photoUrl,
        dateUpdated: Date.now().toString(),
        role: "system",
      },
      selectedBot?.botId
    );
    setSaveLoading(false);
    handleClose();
  };

  return (
    <>
      <div className="chat_header_wrapper_left" onClick={handleClick}>
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

      <Modal
        open={open}
        onClose={handleClose}
        disableRestoreFocus={true}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="new_bot_container">
          <div className="new_bot_header_wrapper">
            <h3>Edit {selectedBot?.name}</h3>
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

export default EditBotModal;
