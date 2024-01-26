import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import uuid4 from "uuid4";
import { db } from "./firebase";
import { defaultBots } from "./constants";
import OpenAI from "openai";
import { process } from "./env";

export const ChatteContext = createContext();
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ChatteProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);

  let hasWindow = typeof window !== "undefined";
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (hasWindow) {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow]);

  const checkEmailExists = async (email) => {
    let userQuery = query(
      collection(db, "zee_users"),
      where("email", "==", email)
    );
    let snap = await getDocs(userQuery);
    let result = [];
    snap.forEach((doc) => {
      result.push({ ...doc.data(), userId: doc.id });
    });
    if (result.length > 0) {
      return result[0];
    }
    return false;
  };

  const createUser = async (userObj) => {
    let userId = uuid4();
    let userRef = doc(db, `zee_users/${userId}`);
    await setDoc(userRef, userObj);
    setCurrentUser(userObj);
    localStorage.setItem("uid", userId);
    await createDefaultBots({ userId, ...userObj });
    setTempUser(null);
  };

  const signinUser = async () => {
    setCurrentUser(tempUser);
    localStorage.setItem("uid", tempUser?.userId);
  };

  const handleSignout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("uid");
  };

  const fetchUser = async () => {
    let userId = localStorage.getItem("uid");
    if (!userId) return false;
    let userRef = doc(db, `zee_users/${userId}`);
    let user = await getDoc(userRef);
    if (user.exists()) {
      return { userId: user.id, ...user.data() };
    } else {
      return false;
    }
  };

  const createDefaultBots = async (userObj) => {
    let promises = [];
    for (let bot of defaultBots) {
      promises.push(
        new Promise(function (resolve, reject) {
          let res = createBot(bot, userObj);
          resolve(res);
          reject("error");
        })
      );
    }
    Promise.all(promises).then(
      (values) => {
        // console.log(values);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  const createBot = async (botObj, user = currentUser) => {
    if (!user) return;
    let botId = uuid4();
    let botRef = doc(db, `zee_users/${user.userId}/bots/${botId}`);
    await setDoc(botRef, botObj);
    return "success";
  };

  const updateBot = async (botObj, botId, user = currentUser) => {
    if (!user || !botId) return;
    let botRef = doc(db, `zee_users/${user.userId}/bots/${botId}`);
    await updateDoc(botRef, botObj);
    return "success";
  };

  const getSamplePrompt = async (botObj) => {
    let outline = botObj.description;
    let prompt = `Generate a sample prompt to be given to a chatbot that does the following.
    ###
    outline : A travel planner
    result: I need assistance planning a vacation. Where should I start?
    
    ###
    outline : A Health and Fitness Chatbot
    result: Create a workout routine for me.

    ###
    outline : A Job search bot
    result: Give me tips for a successful job interview..
    
    ###
    outline: ${outline}
    result: 
    `;

    let messages = [{ role: "user", content: prompt }];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      presence_penalty: 0,
      frequency_penalty: 0.3,
    });

    // console.log(response);
    return response.choices[0].message.content;
  };

  const addToChats = async (chatId, chatObj) => {
    let chatRef = doc(
      db,
      `zee_users/${currentUser?.userId}/bots/${selectedBot.botId}/chats/${chatId}`
    );
    await setDoc(chatRef, chatObj);
  };

  const sendChat = async (chatsArr, content) => {
    let userChatId = uuid4();
    let chatObj = {
      dateCreated: Date.now().toString(),
      role: "user",
      content: content,
    };
    await addToChats(userChatId, chatObj);
    let conversationArr = [selectedBot, ...chatsArr, chatObj];
    conversationArr = conversationArr.map((item) => ({
      content: item.content,
      role: item.role,
    }));
    // console.log(conversationArr);
    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationArr,
      presence_penalty: 0,
      frequency_penalty: 0.3,
    });
    response = response.choices[0].message.content;
    // console.log(response);
    let responseId = uuid4();
    let responseObj = {
      dateCreated: Date.now().toString(),
      content: response,
      role: "assistant",
    };
    await addToChats(responseId, responseObj);
  };

  return (
    <ChatteContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        tempUser,
        setTempUser,
        createUser,
        checkEmailExists,
        signinUser,
        fetchUser,
        screenWidth,
        createBot,
        createDefaultBots,
        selectedBot,
        setSelectedBot,
        handleSignout,
        getSamplePrompt,
        sendChat,
        updateBot,
      }}
    >
      {children}
    </ChatteContext.Provider>
  );
};
