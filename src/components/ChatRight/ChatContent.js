import React, { useContext, useEffect, useState } from "react";
import "./ChatContent.css";
import { ChatteContext } from "../../config/context";
import SendIcon from "@mui/icons-material/Send";
import CustomColors from "../../config/colors";
import { Tooltip } from "@mui/material";
import TypeWriter from "../TypeWriter/TypeWriter";

function ChatContent(props) {
  const { selectedBot } = useContext(ChatteContext);
  const [status, setStatus] = useState("loading");
  const [samplePrompt, setSamplePrompt] = useState("");
  //loading, no-results, results
  useEffect(() => {
    getSamplePrompt();
    setStatus("no-results");
  }, [selectedBot]);

  const getSamplePrompt = async () => {
    setSamplePrompt("");
    let result =
      "Hello! I'm planning a trip to Europe and could use some assistance. Can you help me create a personalized itinerary? I'd like to stay within a moderate budget. Where should I start?";
    setSamplePrompt(result);
    return result;
  };

  return (
    <div className="chatcontent_container">
      <div className="chatcontent_wrapper">
        {status === "no-results" ? (
          <div className="no_result_wrapper">
            <TypeWriter
              style={{ fontFamily: "Nunito Sans", color: CustomColors.dark3 }}
              text={samplePrompt}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <ChatFooter />
    </div>
  );
}

const ChatFooter = ({}) => {
  const { selectedBot } = useContext(ChatteContext);
  const [userPrompt, setUserPrompt] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSend();
  };

  const handleSend = async () => {
    console.log(userPrompt);
    setUserPrompt("");
  };

  const handlePromptChange = (e) => {
    let value = e.target.value;
    setUserPrompt(value);
  };
  return (
    <div className="chatcontent_footer">
      <div className="chatfooter_wrapper">
        <form className="chatfooter_shadow" onSubmit={handleFormSubmit}>
          <input
            placeholder={`Message ${selectedBot?.name}...`}
            value={userPrompt}
            onChange={handlePromptChange}
          />
        </form>
        <Tooltip placement="top" title="Send">
          <div className="chatfooter_right flex_center" onClick={handleSend}>
            <div className="send_btn flex_center">
              <SendIcon sx={{ color: CustomColors.pureWhite }} />
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatContent;
