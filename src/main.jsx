import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { ChatProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <ChatProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#ffffff",
              border: "1px solid #1e293b",
            },
          }}
        />
      </ChatProvider>
    </BrowserRouter>

);