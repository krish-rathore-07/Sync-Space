import React from "react";
import { MessageSquare, LogOut, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useChatContext from "../context/ChatContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    roomId,
    currentUser,
    connected,
    resetChat,
  } = useChatContext();

  const handleLogout = () => {
    resetChat();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/20">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              ChatSphere
            </h1>

            <p className="text-xs text-slate-400">
              Real-Time Messaging
            </p>
          </div>
        </div>

        {/* Room Info */}
        {connected && (
          <div className="hidden items-center gap-4 md:flex">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2">
              <p className="text-xs text-slate-500">
                Room
              </p>

              <p className="font-medium text-white">
                {roomId}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2">
              <p className="text-xs text-slate-500">
                User
              </p>

              <p className="font-medium text-white">
                {currentUser}
              </p>
            </div>
          </div>
        )}

        {/* Status + Logout */}
        <div className="flex items-center gap-3">
          {connected && (
            <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 md:flex">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">
                Connected
              </span>
            </div>
          )}

          {connected && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">
                Leave
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;