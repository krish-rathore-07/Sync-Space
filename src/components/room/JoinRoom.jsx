import React from "react";
import { LogIn } from "lucide-react";

const JoinRoom = ({
  roomId,
  setRoomId,
  joinRoom,
  loading = false,
}) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-7 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-600/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-sky-500 shadow-lg shadow-cyan-500/30">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/30 blur-xl" />
            <LogIn className="relative h-7 w-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Join Room
            </h2>

            <p className="mt-1 text-sm text-slate-400/90">
              Enter an existing room and start chatting
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Room ID
            </label>

            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room id"
              className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/70 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-slate-950 focus:ring-4 focus:ring-cyan-500/20"
            />
          </div>

          <button
            onClick={joinRoom}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(6,182,212,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;