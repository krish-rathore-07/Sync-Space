import React from "react";
import { Paperclip, Send } from "lucide-react";

const ChatInput = ({
  input,
  setInput,
  sendMessage,
  disabled = false,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 shadow-xl">
        {/* Attachment Button */}
        <button
          type="button"
          className="rounded-full p-3 transition-all duration-300 hover:bg-slate-800"
        >
          <Paperclip className="h-5 w-5 text-slate-400" />
        </button>

        {/* Input */}
        <input
          type="text"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          disabled={disabled || !input.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;