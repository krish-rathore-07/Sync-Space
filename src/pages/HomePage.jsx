import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";

import { createRoomAPI, joinChatAPI } from "../services/RoomService";
import useChatContext from "../context/ChatContext";

export default function HomePage() {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const navigate = useNavigate();

  const { setConnected, setRoomId, setCurrentUser } =
    useChatContext();

  const handleFormInputChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!detail.userName.trim() || !detail.roomId.trim()) {
      toast.error("Please fill all fields");
      return false;
    }

    return true;
  };

  const joinChat = async () => {
    if (!validateForm()) return;

    try {
      const room = await joinChatAPI(detail.roomId);

      setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);

      toast.success("Joined room successfully");

      navigate(`/chat/${room.roomId}`);
    } catch (error) {
      toast.error("Room not found");
      console.log(error);
    }
  };

  const createRoom = async () => {
    if (!validateForm()) return;

    try {
      const room = await createRoomAPI(detail.roomId);

      setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);

      toast.success("Room created successfully");

      navigate(`/chat/${room.roomId}`);
    } catch (error) {
      toast.error("Unable to create room");
      console.log(error);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4">

      {/* Grid Background */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "
      />

      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[160px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl">

        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-3xl" />

            <div
              className="
              relative
              flex h-20 w-20 items-center justify-center
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              via-indigo-500
              to-violet-600
              shadow-[0_0_50px_rgba(99,102,241,0.45)]
            "
            >
              <MessageSquare size={34} className="text-white" />
            </div>
          </div>

          <h1
            className="
            mt-6
            bg-gradient-to-r
            from-white
            via-blue-100
            to-violet-200
            bg-clip-text
            text-5xl
            font-extrabold
            tracking-tight
            text-transparent
          "
          >
            ChatSphere
          </h1>

          <p className="mt-3 max-w-md text-center text-slate-400">
            Real-time conversations with secure room-based messaging.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-md">
            <Zap size={14} />
            Real-Time
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-md">
            <Sparkles size={14} />
            Secure
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-md">
            <Globe size={14} />
            Global
          </div>
        </div>

        {/* Card */}
        <div
          className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          p-8
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5" />

          <div className="relative space-y-6">

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="userName"
                  value={detail.userName}
                  onChange={handleFormInputChange}
                  placeholder="Enter your username"
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  pl-12
                  pr-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/20
                "
                />
              </div>
            </div>

            {/* Room ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Room ID
              </label>

              <div className="relative">
                <Sparkles
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="roomId"
                  value={detail.roomId}
                  onChange={handleFormInputChange}
                  placeholder="Enter room id"
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  
                  p-40
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/20
                "
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="grid gap-4 pt-2">

              <button
                onClick={joinChat}
                className="
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                font-semibold
                shadow-lg
                shadow-blue-500/25
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-blue-500/40
              "
              >
                Join Room
              </button>

              <button
                onClick={createRoom}
                className="
                h-14
                rounded-2xl
                border
                border-white/10
                bg-white/5
                text-white
                font-semibold
                transition-all
                duration-300
                hover:bg-white/10
                hover:border-white/20
              "
              >
                Create Room
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
            <div className="text-xl font-bold text-white">24/7</div>
            <div className="text-xs text-slate-400">Online</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
            <div className="text-xl font-bold text-white">Fast</div>
            <div className="text-xs text-slate-400">Messaging</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
            <div className="text-xl font-bold text-white">∞</div>
            <div className="text-xs text-slate-400">Rooms</div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Spring Boot • React • MongoDB • WebSocket
        </p>
      </div>
    </div>
  );
}
