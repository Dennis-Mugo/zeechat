import { createContext, useState } from "react";

export const ChatteContext = createContext();

export const ChatteProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  return (
    <ChatteContext.Provider
      value={{
        currentUser,
        tempUser,
        setTempUser,
      }}
    >
      {children}
    </ChatteContext.Provider>
  );
};
