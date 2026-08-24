/**
 * Custom server so we can attach a real Socket.IO instance to the same HTTP
 * server Next.js uses. This is why `npm run dev` / `npm start` now run
 * `node server.js` instead of the plain `next` CLI.
 *
 * IMPORTANT DEPLOYMENT NOTE: this only works on a host that runs a
 * long-lived Node process (Render, Railway, Fly, a VPS, etc). Vercel's
 * serverless functions do NOT keep a process alive between requests, so a
 * real WebSocket server cannot live there. If you deploy to Vercel anyway,
 * the app still works — src/hooks/useRunSocket.ts detects that the socket
 * never connects and silently falls back to polling. You only lose the
 * "real-time" push, not functionality.
 */
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    path: "/socket.io",
  });

  io.on("connection", (socket) => {
    socket.on("subscribe", (runId) => {
      if (typeof runId === "string") socket.join(`run:${runId}`);
    });
    socket.on("unsubscribe", (runId) => {
      if (typeof runId === "string") socket.leave(`run:${runId}`);
    });
  });

  // Exposed globally so API routes / the simulation pipeline (running in
  // this same process) can emit without importing the server module.
  global.__io = io;

  httpServer.listen(port, () => {
    console.log(`> AgentGuard ready on http://${hostname}:${port} (socket.io attached)`);
  });
});
