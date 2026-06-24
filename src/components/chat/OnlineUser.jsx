import React from "react";
import { Users } from "lucide-react";

const OnlineUser = ({
  users = [],
  currentUser,
}) => {
  return (
    <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          <h2 className="font-semibold text-white">
            Online Users
          </h2>
        </div>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
          {users.length}
        </span>
      </div>

      {/* Users List */}
      <div className="max-h-[600px] overflow-y-auto p-3">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Users className="mb-3 h-10 w-10 text-slate-600" />
            <p className="text-sm text-slate-500">
              No users online
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user, index) => {
              const isCurrentUser =
                user === currentUser;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl p-3 transition-all duration-300 hover:bg-slate-800/70 ${
                    isCurrentUser
                      ? "border border-blue-500/20 bg-blue-500/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                          isCurrentUser
                            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                            : "bg-slate-700 text-slate-200"
                        }`}
                      >
                        {user?.charAt(0)?.toUpperCase()}
                      </div>

                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500"></span>
                    </div>

                    {/* Name */}
                    <div>
                      <p className="font-medium text-white">
                        {user}
                      </p>

                      {isCurrentUser && (
                        <p className="text-xs text-blue-400">
                          You
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineUser;