import express, { json } from "express";
import next from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

// middleware
server.use(json());

// example custom API (you can remove if not needed)
server.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV });
});

app.prepare().then(() => {
  // let Next.js handle everything else
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
