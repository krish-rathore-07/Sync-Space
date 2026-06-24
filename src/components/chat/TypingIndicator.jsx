import React from "react";
import { Loader2 } from "lucide-react";

const TypingIndicator = ({ typingUser }) => {
  if (!typingUser) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 animate-pulse">
      {/* Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-200">
        {typingUser?.charAt(0)?.toUpperCase()}
      </div>

      {/* Typing Bubble */}
      <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 shadow-lg">
        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />

        <span className="text-sm text-slate-300">
          <span className="font-medium text-white">
            {typingUser}
          </span>{" "}
          is typing...
        </span>

        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;