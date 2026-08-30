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

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/agent");
      if (res.ok && !cancelled) setState(await res.json());
    }
    load();

    const socket = getSocket();
    socket.on("agent:changed", load);
    socket.on("connect", load);
    const interval = setInterval(load, 5000);

    return () => {
      cancelled = true;
      socket.off("agent:changed", load);
      socket.off("connect", load);
      clearInterval(interval);
    };
  }, []);

  async function reset() {
    const res = await fetch("/api/agent/reset", { method: "POST" });
    if (res.ok) setState(await res.json());
  }

  return { state, reset };
}
