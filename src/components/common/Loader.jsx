import React from "react";

const Loader = ({
  text = "Loading...",
  fullScreen = true,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Spinner */}
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-slate-700"></div>

        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-violet-500"></div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">
          {text}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Please wait a moment...
        </p>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:300ms]" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
        {content}
      </div>
    );
  }
// this is my o,ment 
  return (
    <div className="flex items-center justify-center py-10">
      {content}
    </div>
  );
};

export default Loader;