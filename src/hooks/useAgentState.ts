"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface AgentStateView {
  prompt: string;
  version: number;
  history: { version: number; reason: string; at: number }[];
}

let sharedSocket: Socket | null = null;
function getSocket(): Socket {
  if (!sharedSocket) sharedSocket = io({ path: "/socket.io" });
  return sharedSocket;
}

export function useAgentState() {
  const [state, setState] = useState<AgentStateView | null>(null);

  async function refresh() {
    const res = await fetch("/api/agent");
    if (res.ok) setState(await res.json());
  }

  useEffect(() => {
    refresh();
    const socket = getSocket();
    socket.on("agent:changed", refresh);
    socket.on("connect", refresh);
    const interval = setInterval(refresh, 5000);
    return () => {
      socket.off("agent:changed", refresh);
      socket.off("connect", refresh);
      clearInterval(interval);
    };
  }, []);

  async function reset() {
    const res = await fetch("/api/agent/reset", { method: "POST" });
    if (res.ok) setState(await res.json());
  }

  return { state, reset, refresh };
}
