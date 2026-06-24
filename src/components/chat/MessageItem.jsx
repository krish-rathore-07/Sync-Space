import React from "react";

const MessageItem = ({ message, currentUser }) => {
  const isCurrentUser = message.sender === currentUser;

  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`group max-w-[80%] rounded-3xl px-5 py-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
          isCurrentUser
            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
            : "border border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              isCurrentUser
                ? "bg-white/20 text-white"
                : "bg-slate-700 text-slate-200"
            }`}
          >
            {message.sender?.charAt(0)?.toUpperCase()}
          </div>

          {/* Sender Info */}
          <div>
            <h4 className="text-sm font-semibold">
              {message.sender}
            </h4>

            <p
              className={`text-xs ${
                isCurrentUser
                  ? "text-blue-100"
                  : "text-slate-400"
              }`}
            >
              {message.timestamp
                ? new Date(message.timestamp).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : ""}
            </p>
          </div>
        </div>

        {/* Message Content */}
        <div className="break-words">
          <p className="leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;