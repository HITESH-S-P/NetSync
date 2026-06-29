import type { SignalData } from "simple-peer";
import type { Socket } from "socket.io";

import { StreamServiceMsg } from "@rvsync/types/message";

import * as roomService from "./room-service";
import * as userService from "./user-service";

export const onStreamReady = (socket: Socket) => {
  const room = roomService.getUserRoom(socket);
  if (room) {
    socket
      .to(room)
      .emit(StreamServiceMsg.USER_READY, userService.getCustomId(socket.id));
  }
};

export const handleSignal = (
  socket: Socket,
  payload: { targetID: string; signal: SignalData }
) => {
  const room = roomService.getUserRoom(socket);
  if (!room) return;

  const targetSocketId = userService.getSocketId(payload.targetID);
  if (targetSocketId) {
    socket.to(targetSocketId).emit(StreamServiceMsg.SIGNAL, {
      userID: userService.getCustomId(socket.id),
      signal: payload.signal,
    });
  }
};

export const onCameraOff = (socket: Socket) => {
  const room = roomService.getUserRoom(socket);
  if (room) {
    socket
      .to(room)
      .emit(StreamServiceMsg.CAMERA_OFF, userService.getCustomId(socket.id));
  }
};

export const handleMicState = (socket: Socket, micOn: boolean) => {
  const room = roomService.getUserRoom(socket);
  if (room) {
    socket.to(room).emit(StreamServiceMsg.MIC_STATE, {
      userID: userService.getCustomId(socket.id),
      micOn,
    });
  }
};

export const handleSpeakerState = (socket: Socket, speakersOn: boolean) => {
  const room = roomService.getUserRoom(socket);
  if (room) {
    socket.to(room).emit(StreamServiceMsg.SPEAKER_STATE, {
      userID: userService.getCustomId(socket.id),
      speakersOn,
    });
  }
};
