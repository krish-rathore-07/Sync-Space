import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages = [], currentUser }) => {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">💬</div>

          <h2 className="text-xl font-semibold text-white">
            No messages yet
          </h2>

          <p className="mt-2 text-slate-400">
            Start the conversation and send your first message.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      {messages.map((message, index) => (
        <MessageItem
          key={`${message.sender}-${index}`}
          message={message}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default MessageList;