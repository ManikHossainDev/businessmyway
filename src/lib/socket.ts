/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { io, Socket } from "socket.io-client";
import { getFromCookies } from "@/utils/cookies-storage";

export interface ChatParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Conversation {
  id: string;
  participants: ChatParticipant[];
  partner: ChatParticipant;
  lastMessage?: {
    message: string;
    senderId: string;
    sentAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  roomId: string;
  messageId: string;
  message: string;
  sender: {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
  };
  sentAt: string;
  createdAt: string;
  clientMessageId?: string;
}

let socket: Socket | null = null;
let currentToken: string | null = null;

export const getSocketUrl = (): string => {
  const envSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (envSocketUrl) return envSocketUrl;

  const envApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  try {
    const url = new URL(envApiUrl);
    return `${url.protocol}//${url.host}`;
  } catch {
    return "http://localhost:5000";
  }
};

export const getSocket = (token?: string): Socket => {
  const activeToken = token || getFromCookies("token") || null;

  if (socket && currentToken === activeToken) {
    if (!socket.connected && !socket.active) {
      socket.connect();
    }
    return socket;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  currentToken = activeToken;
  const baseUrl = getSocketUrl();

  socket = io(baseUrl, {
    path: "/socket.io",
    transports: ["websocket", "polling"],
    auth: {
      token: activeToken,
    },
    extraHeaders: activeToken
      ? {
          Authorization: `Bearer ${activeToken}`,
        }
      : undefined,
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentToken = null;
  }
};

export const startChat = (
  targetUserId?: string,
  token?: string,
): Promise<{
  ok: boolean;
  conversation?: Conversation;
  conversations?: Conversation[];
  onlineUserIds?: string[];
  message?: string;
}> => {
  return new Promise((resolve) => {
    const s = getSocket(token);
    let resolved = false;

    const safeResolve = (data: {
      ok: boolean;
      conversation?: Conversation;
      conversations?: Conversation[];
      onlineUserIds?: string[];
      message?: string;
    }) => {
      if (!resolved) {
        resolved = true;
        resolve(data);
      }
    };

    const emitStart = () => {
      s.emit("chat:start", targetUserId ? { targetUserId } : undefined, (res: any) => {
        if (!res) {
          safeResolve({ ok: false, message: "No response from chat server" });
        } else if (res.ok) {
          safeResolve({
            ok: true,
            conversation: res.data?.conversation,
            conversations: res.data?.conversations,
            onlineUserIds: res.data?.onlineUserIds,
          });
        } else {
          safeResolve({ ok: false, message: res.message || "Failed to start chat" });
        }
      });
    };

    if (s.connected) {
      emitStart();
    } else {
      s.once("connect", () => {
        emitStart();
      });

      s.once("connect_error", (err: any) => {
        safeResolve({
          ok: false,
          message: err?.message || "Socket authentication failed. Please re-login.",
        });
      });

      // Safety timeout: 10 seconds
      setTimeout(() => {
        if (!resolved && !s.connected) {
          safeResolve({ ok: false, message: "Connection timeout. Please check your network." });
        }
      }, 10000);
    }
  });
};

export const joinChatRoom = (
  roomId: string,
  token?: string,
): Promise<{ ok: boolean; message?: string }> => {
  return new Promise((resolve) => {
    const s = getSocket(token);
    s.emit("chat:join", { roomId }, (res: any) => {
      if (res?.ok) resolve({ ok: true });
      else resolve({ ok: false, message: res?.message || "Failed to join room" });
    });
  });
};

export const leaveChatRoom = (
  roomId: string,
  token?: string,
): Promise<{ ok: boolean; message?: string }> => {
  return new Promise((resolve) => {
    const s = getSocket(token);
    s.emit("chat:leave", { roomId }, (res: any) => {
      if (res?.ok) resolve({ ok: true });
      else resolve({ ok: false, message: res?.message || "Failed to leave room" });
    });
  });
};

export const getChatHistory = (
  conversationId: string,
  token?: string,
): Promise<{ ok: boolean; messages?: ChatMessage[]; message?: string }> => {
  return new Promise((resolve) => {
    const s = getSocket(token);

    const emitHistory = () => {
      s.emit("chat:history", { conversationId }, (res: any) => {
        if (res?.ok) {
          resolve({ ok: true, messages: res.data?.messages || [] });
        } else {
          resolve({ ok: false, message: res?.message || "Failed to load chat history" });
        }
      });
    };

    if (s.connected) {
      emitHistory();
    } else {
      s.once("connect", () => {
        emitHistory();
      });
      setTimeout(() => {
        if (!s.connected) {
          resolve({ ok: false, message: "Connection timeout" });
        }
      }, 7000);
    }
  });
};

export const sendChatMessage = (
  roomId: string,
  message: string,
  clientMessageId?: string,
  token?: string,
): Promise<{ ok: boolean; messageId?: string; message?: string }> => {
  return new Promise((resolve) => {
    const s = getSocket(token);
    s.emit(
      "chat:message",
      {
        roomId,
        message,
        clientMessageId: clientMessageId || `client-${Date.now()}`,
      },
      (res: any) => {
        if (res?.ok) {
          resolve({ ok: true, messageId: res.data?.messageId });
        } else {
          resolve({ ok: false, message: res?.message || "Failed to send message" });
        }
      },
    );
  });
};
