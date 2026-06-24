import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";

const useWebSocket = (roomId, onMessageReceived) => {
  const [connected, setConnected] = useState(false);

  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${baseURL}/chat`),

      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        client.subscribe(
          `/topic/room/${roomId}`,
          (message) => {
            const body = JSON.parse(message.body);

            if (onMessageReceived) {
              onMessageReceived(body);
            }
          }
        );
      },

      onDisconnect: () => {
        setConnected(false);
      },

      onStompError: (frame) => {
        console.error(
          "STOMP Error:",
          frame.headers["message"]
        );
      },
    });

    client.activate();

    stompClientRef.current = client;

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [roomId]);

  const sendMessage = (message) => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected
    ) {
      stompClientRef.current.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify(message),
      });
    }
  };

  return {
    connected,
    sendMessage,
    stompClient: stompClientRef.current,
  };
};

export default useWebSocket;