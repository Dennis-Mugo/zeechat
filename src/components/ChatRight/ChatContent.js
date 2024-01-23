import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatContent.css";
import { ChatteContext } from "../../config/context";
import SendIcon from "@mui/icons-material/Send";
import CustomColors from "../../config/colors";
import { Avatar, CircularProgress, Tooltip } from "@mui/material";
import TypeWriter from "../TypeWriter/TypeWriter";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";

function ChatContent(props) {
  const { selectedBot, getSamplePrompt, currentUser } =
    useContext(ChatteContext);
  const [status, setStatus] = useState("loading");
  const [samplePrompt, setSamplePrompt] = useState("");
  const [results, setResults] = useState([]);
  //loading, no-results, results
  const [lastChatType, setLastChatType] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const dummyFooter = useRef(null);

  // useEffect(() => {
  //   setSamplePrompt("");
  //   if (!selectedBot) return;
  //   fetchSamplePrompt();
  //   setStatus("no-results");
  // }, [selectedBot]);

  const scrollToBottom = () => {
    dummyFooter.current
      ?.scrollIntoView
      // { behavior: "smooth" }
      ();
  };

  useEffect(() => {
    if (status === "results") {
      scrollToBottom();
    }
  }, [selectedBot, status, results]);

  useEffect(() => {
    setStatus("loading");
    setResults([]);
    setLastChatType(false);
    if (!selectedBot) return;
    let chatsRef = collection(
      db,
      `zee_users/${currentUser.userId}/bots/${selectedBot.botId}/chats`
    );
    let chatsQuery = query(chatsRef, orderBy("dateCreated", "asc"));
    let unsub = onSnapshot(chatsQuery, async (snapshot) => {
      let lst = [];
      snapshot.forEach((doc) => {
        lst.push({ ...doc.data(), chatId: doc.id });
      });

      if (!lst.length) {
        await fetchSamplePrompt();
        setStatus("no-results");
      } else {
        if (lst[lst.length - 1].role === "assistant") {
          setSendLoading(false);
        }
        setResults(lst);
        setStatus("results");
      }
    });
    return unsub;
  }, [selectedBot]);

  const fetchSamplePrompt = async () => {
    setSamplePrompt("");
    let res = await getSamplePrompt(selectedBot);
    setSamplePrompt(res);
    let result =
      "Hello! I'm planning a trip to Europe and could use some assistance. Can you help me create a personalized itinerary? I'd like to stay within a moderate budget. Where should I start?";
    // setSamplePrompt(result);
    return result;
  };

  return (
    <div className="chatcontent_container">
      <div className="chatcontent_wrapper">
        {status === "no-results" ? (
          <div className="no_result_wrapper">
            <TypeWriter
              style={{
                fontFamily: "Nunito",
                color: CustomColors.purple,
                fontSize: "25px",
                margin: "0 20px",
              }}
              text={samplePrompt}
            />
          </div>
        ) : status === "loading" ? (
          <div className="flex_center loader_wrapper">
            <div className="loader_shadow flex_center">
              <CircularProgress sx={{ color: CustomColors.purple }} />
            </div>
          </div>
        ) : status === "results" ? (
          <div className="results_wrapper">
            {results.map((chatObj, i) => (
              <ChatItem
                key={chatObj.chatId}
                typeWrite={
                  results.length === i + 1 &&
                  chatObj.role === "assistant" &&
                  lastChatType
                }
                scrollToBottom={scrollToBottom}
                chatObj={chatObj}
              />
            ))}
            {sendLoading ? (
              <ChatItem
                scrollToBottom={scrollToBottom}
                chatObj={{ role: "assistant", content: "●●●" }}
              />
            ) : (
              <></>
            )}
            <div ref={dummyFooter} className="dummy_footer"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <ChatFooter
        results={results}
        setLastChatType={setLastChatType}
        sendLoading={sendLoading}
        setSendLoading={setSendLoading}
      />
    </div>
  );
}

const ChatItem = ({ chatObj, typeWrite, scrollToBottom }) => {
  const { selectedBot, currentUser } = useContext(ChatteContext);
  const userInitial = currentUser?.email[0].toUpperCase();
  const isBot = chatObj?.role === "assistant";
  const chatContentStyle = {
    fontFamily: "Nunito",
    fontSize: "17px",
    color: CustomColors.dark1,
    fontWeight: 400,
    textAlign: "left",
  };

  return (
    <>
      {isBot ? (
        <div className="chat_left_container">
          <div className="chat_wrapper">
            <div className="chat_avatar">
              <Avatar
                sx={{ backgroundColor: CustomColors.grey300 }}
                src={selectedBot?.photoUrl}
              />
            </div>
            <div className="chat_right">
              <div className="chat_item_shadow">
                {typeWrite ? (
                  <TypeWriter
                    scrollToBottom={scrollToBottom}
                    text={chatObj?.content}
                    style={chatContentStyle}
                  />
                ) : (
                  <h2 style={chatContentStyle}>{chatObj?.content}</h2>
                )}
              </div>
              <p className="chat_time">2:50 pm</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat_bubble_right">
          <div className="chat_wrapper">
            <div className="chat_right">
              <div className="chat_item_shadow_right">
                <h2 style={chatContentStyle}>{chatObj?.content}</h2>
              </div>
              <p className="chat_time_right">2:50 pm</p>
            </div>
            <div className="chat_avatar">
              <Avatar sx={{ backgroundColor: CustomColors.purple }}>
                {userInitial}
              </Avatar>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ChatFooter = ({
  results,
  setLastChatType,
  sendLoading,
  setSendLoading,
}) => {
  const { selectedBot, sendChat } = useContext(ChatteContext);
  const [userPrompt, setUserPrompt] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSend();
  };

  const handleSend = async () => {
    if (sendLoading) return;
    console.log(userPrompt);
    let prompt = userPrompt.trim();
    if (!prompt.length) return;
    setUserPrompt("");
    setSendLoading(true);
    await sendChat(results, prompt);
    setSendLoading(false);
    setLastChatType(true);
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
