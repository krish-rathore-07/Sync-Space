import { httpClient } from "../config/AxiosHelper";

export const sendMessageAPI = async (roomId, message) => {
  try {
    const response = await httpClient.post(
      `/api/v1/rooms/${roomId}/messages`,
      message
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getMessagesAPI = async (
  roomId,
  page = 0,
  size = 50
) => {
  try {
    const response = await httpClient.get(
      `/api/v1/rooms/${roomId}/messages?page=${page}&size=${size}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const clearMessagesAPI = async (roomId) => {
  try {
    const response = await httpClient.delete(
      `/api/v1/rooms/${roomId}/messages`
    );

    return response.data;
  } catch (error) {
    console.error("Error clearing messages:", error);
    throw error;
  }
};

const ChatService = {
  sendMessageAPI,
  getMessagesAPI,
  clearMessagesAPI,
};

export default ChatService;