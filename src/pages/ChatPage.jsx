import React, { useEffect, useRef, useState } from "react";
import {
  LogOut,
  Paperclip,
  Send,
  Users,
  MessageSquare,
} from "lucide-react";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useChatContext from "../context/ChatContext";
import { baseURL } from "../config/AxiosHelper";
import { getMessages } from "../services/RoomService";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages(roomId);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (connected) {
      loadMessages();
    }
  }, [roomId, connected]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop =
        chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!connected) return;

    const socket = new SockJS(`${baseURL}/chat`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);

      toast.success("Connected");

      client.subscribe(`/topic/room/${roomId}`, (payload) => {
        const message = JSON.parse(payload.body);

        setMessages((prev) => [...prev, message]);
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, [roomId, connected]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (stompClient && connected) {
      const message = {
        sender: currentUser,
        content: input,
        roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );

      setInput("");
    }
  };

  const handleLogout = () => {
    if (stompClient) {
      stompClient.disconnect();
    }

    setConnected(false);
    setRoomId("");
    setCurrentUser("");

    toast.success("Disconnected");

    navigate("/");
  };

  return (
    <div className="h-screen overflow-hidden bg-[#08090f] text-white">

      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden">

        <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[180px]" />

        <div className="absolute right-[-150px] bottom-[-150px] h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[140px]" />

      </div>

      <div className="relative flex h-screen">

        {/* Sidebar */}
        <aside
          className="
          hidden
          w-80
          flex-col
          border-r
          border-white/10
          bg-white/[0.03]
          backdrop-blur-3xl
          lg:flex
        "
        >
          {/* Brand */}
          <div className="border-b border-white/10 p-7">

            <div
              className="
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              to-violet-600
              shadow-[0_0_35px_rgba(99,102,241,0.4)]
            "
            >
              <MessageSquare size={30} />
            </div>

            <h1
              className="
              bg-gradient-to-r
              from-white
              to-slate-300
              bg-clip-text
              text-4xl
              font-extrabold
              text-transparent
            "
            >
              ChatSphere
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Apple-inspired messaging experience
            </p>
          </div>

          {/* User Card */}
          <div className="p-6">

            <div
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
            >
              <p className="text-xs uppercase tracking-[3px] text-slate-500">
                Current User
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  to-violet-600
                  text-xl
                  font-bold
                  shadow-[0_0_35px_rgba(99,102,241,0.45)]
                "
                >
                  {currentUser?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {currentUser}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-green-500"></div>
                      <div className="relative h-3 w-3 rounded-full bg-green-500"></div>
                    </div>

                    <span className="text-sm text-green-400">
                      Online
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div
              className="
              mt-5
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
            >
              <p className="text-xs uppercase tracking-[3px] text-slate-500">
                Active Room
              </p>

              <h2
                className="
                mt-3
                bg-gradient-to-r
                from-blue-300
                to-violet-300
                bg-clip-text
                text-2xl
                font-bold
                text-transparent
              "
              >
                {roomId}
              </h2>
            </div>

            <div
              className="
              mt-5
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span className="text-slate-300">
                  Messages
                </span>
              </div>

              <h2 className="mt-3 text-5xl font-bold">
                {messages.length}
              </h2>
            </div>
          </div>

          <div className="mt-auto p-6">
            <button
              onClick={handleLogout}
              className="
              w-full
              rounded-2xl
              bg-red-500
              py-4
              font-semibold
              transition-all
              duration-300
              hover:bg-red-600
            "
            >
              Leave Room
            </button>
          </div>
        </aside>

        {/* Main Section Starts Here */}
        <section className="flex flex-1 flex-col">
                    {/* Apple Header */}
          <header
            className="
            sticky
            top-0
            z-50
            border-b
            border-white/10
            bg-black/10
            backdrop-blur-3xl
          "
          >
            <div className="flex items-center justify-between px-6 py-5">

              <div>
                <h1
                  className="
                  bg-gradient-to-r
                  from-blue-300
                  to-violet-300
                  bg-clip-text
                  text-3xl
                  font-bold
                  text-transparent
                "
                >
                  #{roomId}
                </h1>

                <p className="text-sm text-slate-400">
                  Secure real-time conversation
                </p>
              </div>

              <div className="flex items-center gap-3">

                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-500"></div>

                  <div className="relative h-3 w-3 rounded-full bg-green-500"></div>
                </div>

                <span className="text-sm text-slate-300">
                  Live
                </span>

              </div>
            </div>
          </header>

          {/* Messages Area */}
          <main
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto px-4 py-8 md:px-10"
          >
            <div className="mx-auto max-w-5xl">

              {/* Empty State */}
              {messages.length === 0 && (
                <div className="flex h-[70vh] items-center justify-center">

                  <div className="text-center">

                    <div
                      className="
                      mx-auto
                      mb-6
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-full
                      bg-white/5
                      backdrop-blur-xl
                    "
                    >
                      <MessageSquare
                        size={40}
                        className="text-slate-500"
                      />
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                      Welcome to ChatSphere
                    </h2>

                    <p className="mt-3 text-slate-400">
                      Start your first conversation.
                    </p>

                  </div>

                </div>
              )}

              {/* Messages */}
              <div className="space-y-6">

                {messages.map((message, index) => {
                  const isCurrentUser =
                    message.sender === currentUser;

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isCurrentUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="relative max-w-[70%]">

                        {/* Bubble Tail */}
                        {isCurrentUser ? (
                          <div className="absolute bottom-4 right-[-6px] h-4 w-4 rotate-45 bg-blue-600" />
                        ) : (
                          <div className="absolute bottom-4 left-[-6px] h-4 w-4 rotate-45 border-b border-l border-white/10 bg-[#14161d]" />
                        )}

                        <div
                          className={`
                          rounded-[28px]
                          px-5
                          py-4
                          transition-all
                          duration-300
                          hover:scale-[1.01]
                          ${
                            isCurrentUser
                              ? `
                                bg-gradient-to-br
                                from-blue-500
                                via-blue-600
                                to-violet-600
                                text-white
                                shadow-[0_10px_40px_rgba(59,130,246,0.3)]
                              `
                              : `
                                border
                                border-white/10
                                bg-white/[0.06]
                                text-white
                                backdrop-blur-xl
                              `
                          }
                        `}
                        >

                          <div className="mb-3 flex items-center gap-3">

                            <div
                              className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              bg-gradient-to-br
                              from-blue-500
                              to-violet-600
                              font-bold
                            "
                            >
                              {message.sender
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold">
                                {message.sender}
                              </p>

                              <p className="text-xs opacity-70">
                                {message.timestamp
                                  ? new Date(
                                      message.timestamp
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : ""}
                              </p>
                            </div>

                          </div>

                          <p className="break-words leading-relaxed">
                            {message.content}
                          </p>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>

          {/* Apple Input */}
          <div
            className="
            border-t
            border-white/10
            bg-black/10
            p-5
            backdrop-blur-3xl
          "
          >
            <div
              className="
              mx-auto
              flex
              max-w-5xl
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/[0.05]
              px-4
              py-3
              backdrop-blur-3xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            "
            >

              <button className="rounded-full p-3 transition hover:bg-white/10">
                <Paperclip className="h-5 w-5 text-slate-400" />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                type="text"
                placeholder="iMessage style chatting..."
                className="
                flex-1
                bg-transparent
                text-[15px]
                text-white
                outline-none
                placeholder:text-slate-500
              "
              />

              <button
                onClick={sendMessage}
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-violet-600
                shadow-[0_0_30px_rgba(99,102,241,0.4)]
                transition-all
                duration-300
                hover:scale-110
              "
              >
                <Send className="h-5 w-5 text-white" />
              </button>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default ChatPage;