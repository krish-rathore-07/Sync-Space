import { httpClient } from "../config/AxiosHelper";

export const createRoomAPI = async (roomName) => {
  try {
    const response = await httpClient.post("/api/v1/rooms", {
      roomName,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const joinChatAPI = async (roomId) => {
  try {
    const response = await httpClient.get(
      `/api/v1/rooms/${roomId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};

export const getMessages = async (
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

export const getRoomDetails = async (roomId) => {
  try {
    const response = await httpClient.get(
      `/api/v1/rooms/${roomId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};

const RoomService = {
  createRoomAPI,
  joinChatAPI,
  getMessages,
  getRoomDetails,
};

export default RoomService;