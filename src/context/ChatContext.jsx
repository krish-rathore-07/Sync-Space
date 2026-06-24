import { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);

  const resetChat = () => {
    setRoomId("");
    setCurrentUser("");
    setConnected(false);
  };

  const value = useMemo(
    () => ({
      roomId,
      currentUser,
      connected,

      setRoomId,
      setCurrentUser,
      setConnected,

      resetChat,
    }),
    [roomId, currentUser, connected]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatProvider"
    );
  }

  return context;
};

export default useChatContext;