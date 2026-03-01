"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Background from "../components/Background";
import InfoPanel from "../components/InfoPanel";

type ServerSocketMessage = {
  type: "snapshot" | "update";
  bookId: string;
  userId: string;
  content: string;
  updatedAt: string;
};

type ClientSocketMessage = {
  type: "edit";
  content: string;
};

const DEFAULT_SOCKET_BASE = "ws://localhost:8080/ws";

function buildSocketURL(base: string, bookId: string, userId: string): string {
  const url = new URL(base);
  url.searchParams.set("bookId", bookId);
  url.searchParams.set("userId", userId);
  return url.toString();
}

export default function Main() {
  const [bookId, setBookID] = useState("book-1");
  const [userId, setUserID] = useState(() => `user-${Math.floor(Math.random() * 10000)}`);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [lastAuthor, setLastAuthor] = useState("-");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("-");

  const wsRef = useRef<WebSocket | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const skipNextSendRef = useRef(false);

  const socketBase = useMemo(
    () => process.env.NEXT_PUBLIC_SOCKET_URL || DEFAULT_SOCKET_BASE,
    []
  );

  const connectSocket = () => {
    if (status === "connecting" || status === "connected") {
      return;
    }

    setStatus("connecting");
    const ws = new WebSocket(buildSocketURL(socketBase, bookId, userId));
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as ServerSocketMessage;
      if (data.type !== "snapshot" && data.type !== "update") {
        return;
      }

      skipNextSendRef.current = true;
      setContent(data.content);
      setLastAuthor(data.userId || "-");
      setLastUpdatedAt(new Date(data.updatedAt).toLocaleString());
    };

    ws.onerror = () => {
      setStatus("disconnected");
    };

    ws.onclose = () => {
      setStatus("disconnected");
      wsRef.current = null;
    };
  };

  const disconnectSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus("disconnected");
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (status !== "connected" || !wsRef.current) {
      return;
    }
    if (skipNextSendRef.current) {
      skipNextSendRef.current = false;
      return;
    }

    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = window.setTimeout(() => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        return;
      }
      const payload: ClientSocketMessage = { type: "edit", content };
      wsRef.current.send(JSON.stringify(payload));
    }, 250);
  }, [content, status]);

  return (
    <div className="min-h-screen flex h-screen items-center justify-center p-3 relative">
      <Background />
      <InfoPanel />

      <div className="absolute left-8 bottom-8 bg-white/95 border border-marrom rounded-xl p-4 w-[min(560px,90vw)] shadow-lg">
        <div className="flex flex-wrap gap-2 mb-3">
          <input
            className="border rounded px-3 py-2 flex-1 min-w-32"
            value={bookId}
            onChange={(e) => setBookID(e.target.value)}
            placeholder="bookId"
            disabled={status === "connected" || status === "connecting"}
          />
          <input
            className="border rounded px-3 py-2 flex-1 min-w-32"
            value={userId}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="userId"
            disabled={status === "connected" || status === "connecting"}
          />
          {status === "connected" ? (
            <button
              className="bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              onClick={disconnectSocket}
            >
              Disconnect
            </button>
          ) : (
            <button
              className="bg-marrom text-white px-4 py-2 rounded cursor-pointer"
              onClick={connectSocket}
            >
              Connect
            </button>
          )}
        </div>

        <p className="text-sm mb-2">
          Status: <strong>{status}</strong> | Last author: <strong>{lastAuthor}</strong> | Updated:{" "}
          <strong>{lastUpdatedAt}</strong>
        </p>

        <textarea
          className="w-full min-h-48 border rounded p-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing here..."
          disabled={status !== "connected"}
        />
      </div>
    </div>
  );
}
