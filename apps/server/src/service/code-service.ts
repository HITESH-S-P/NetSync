import type { Server, Socket } from "socket.io";

import { CodeServiceMsg } from "@rvsync/types/message";
import type { EditOp } from "@rvsync/types/operation";

import { getUserRoom } from "./room-service";
import { getCustomId } from "./user-service";

type RoomData = {
  code: string;
  langId: string;
};

const roomData = new Map<string, RoomData>();

const DEFAULT_LANG_ID = "html";

export const roomExists = (roomID: string): boolean => {
  return roomData.has(roomID);
};

function initializeRoom(roomID: string): RoomData {
  let data = roomData.get(roomID);
  if (!data) {
    data = { code: "", langId: DEFAULT_LANG_ID };
    roomData.set(roomID, data);
  }
  return data;
}

export const getCode = (roomID: string): string => {
  return roomData.get(roomID)?.code || "";
};

export const getLang = (roomID: string): string => {
  return roomData.get(roomID)?.langId || DEFAULT_LANG_ID;
};

export const setLang = (roomID: string, langId: string): void => {
  const data = initializeRoom(roomID);
  data.langId = langId;
};

export const syncCode = (socket: Socket, io: Server): void => {
  const customId = getCustomId(socket.id);
  if (customId) {
    const code = getCode(getUserRoom(socket));
    io.to(socket.id).emit(CodeServiceMsg.SYNC_CODE, code);
  }
};

export const syncLang = (socket: Socket, io: Server): void => {
  const roomID = getUserRoom(socket);
  if (!roomID) return;

  const customId = getCustomId(socket.id);
  if (customId) {
    const langId = getLang(roomID);
    io.to(socket.id).emit(CodeServiceMsg.UPDATE_LANG, langId);
  }
};

export const updateLang = (socket: Socket, langId: string): void => {
  const roomID = getUserRoom(socket);
  if (!roomID) return;

  const customId = getCustomId(socket.id);
  if (customId) {
    setLang(roomID, langId);
    socket.to(roomID).emit(CodeServiceMsg.UPDATE_LANG, langId);
  }
};
const getFlatIndex = (lines: string[], lineNum: number, col: number): number => {
  let index = 0;
  for (let i = 0; i < lineNum - 1; i++) {
    index += (lines[i] ?? "").length + 1; // +1 for the newline character
  }
  index += col - 1;
  return index;
};

export const updateCode = (socket: Socket, operation: EditOp): void => {
  const roomID = getUserRoom(socket);
  const customId = getCustomId(socket.id);

  if (!customId || !roomID) return;

  socket.to(roomID).emit(CodeServiceMsg.UPDATE_CODE, operation);

  const currentCode = getCode(roomID);
  const [txt, startLnNum, startCol, endLnNum, endCol] = operation;

  const lines = currentCode.split("\n");
  const startIdx = getFlatIndex(lines, startLnNum, startCol);
  const endIdx = getFlatIndex(lines, endLnNum, endCol);

  const updatedCode =
    currentCode.substring(0, startIdx) +
    txt +
    currentCode.substring(endIdx);

  const data = initializeRoom(roomID);
  data.code = updatedCode;
};

export const deleteRoom = (roomID: string): void => {
  roomData.delete(roomID);
};
