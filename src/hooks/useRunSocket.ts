"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RunState } from "@/lib/types";

let sharedSocket: Socket | null = null;
function getSocket(): Socket {
  if (!sharedSocket) {
    sharedSocket = io({ path: "/socket.io" });
  }
  return sharedSocket;
}

/** Live state for a single run — pushed over Socket.IO, polling as a safety net if no socket server is attached. */
export function useRunSocket(runId: string | null) {
  const [run, setRun] = useState<RunState | null>(null);
  const [live, setLive] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!runId) return;
    const socket = getSocket();
    let cancelled = false;

    function startPollingFallback() {
      if (pollRef.current) return;
      pollRef.current = setInterval(async () => {
        const res = await fetch(`/api/runs/${runId}`);
        if (res.ok && !cancelled) setRun(await res.json());
      }, 700);
    }

    function stopPollingFallback() {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }

    function onConnect() {
      setLive(true);
      stopPollingFallback();
      socket.emit("subscribe", runId);
    }
    function onDisconnect() {
      setLive(false);
      startPollingFallback();
    }
    function onProgress(data: RunState) {
      if (data.id === runId && !cancelled) setRun(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("run:progress", onProgress);
    if (socket.connected) onConnect();

    // Initial paint so the screen isn't blank before the first event arrives.
    fetch(`/api/runs/${runId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && !cancelled && setRun(d));

    // If nothing connects within 1.2s (e.g. deployed on serverless with no
    // custom server attached), fall back to polling so the UI still works.
    const fallbackTimer = setTimeout(() => {
      if (!socket.connected) startPollingFallback();
    }, 1200);

    return () => {
      cancelled = true;
      socket.emit("unsubscribe", runId);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("run:progress", onProgress);
      clearTimeout(fallbackTimer);
      stopPollingFallback();
    };
  }, [runId]);

  return { run, live };
}

/** Live-refreshing list of recent runs — refetches on the "runs:changed" broadcast, with a slow safety-net poll. Returns undefined until the first fetch resolves. */
export function useRunsList(): RunState[] | undefined {
  const [runs, setRuns] = useState<RunState[] | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/runs");
      const data = await res.json();
      if (!cancelled) setRuns(data.runs ?? []);
    }
    load();

    const socket = getSocket();
    function onChanged() {
      load();
    }
    socket.on("runs:changed", onChanged);
    socket.on("connect", onChanged);

    // Safety-net poll in case an event is ever missed (e.g. brief disconnect).
    const interval = setInterval(load, 4000);

    return () => {
      cancelled = true;
      socket.off("runs:changed", onChanged);
      socket.off("connect", onChanged);
      clearInterval(interval);
    };
  }, []);

  return runs;
}
