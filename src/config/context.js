import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import uuid4 from "uuid4";
import { db } from "./firebase";

export const ChatteContext = createContext();

export const ChatteProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

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
    setTempUser(null);
  };

  const signinUser = async () => {
    setCurrentUser(tempUser);
    localStorage.setItem("uid", tempUser?.userId);
  };

  const fetchUser = async () => {
    let userId = localStorage.getItem("uid");
    if (!userId) return false;
    let userRef = doc(db, `zee_users/${userId}`);
    let user = await getDoc(userRef);
    if (user.exists()) {
      return user;
    } else {
      return false;
    }
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
      }}
    >
      {children}
    </ChatteContext.Provider>
  );
};
