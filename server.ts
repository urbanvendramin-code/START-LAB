import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";
import { createApiApp } from "./src/serverApp";

dotenv.config();

// Override console to also write to a log file
const logFilePath = path.join(process.cwd(), "server.log");
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

function writeLog(level: string, ...args: any[]) {
  const timestamp = new Date().toISOString();
  const formattedArgs = args.map(arg => 
    typeof arg === "object" ? JSON.stringify(arg) : String(arg)
  ).join(" ");
  const line = `[${timestamp}] [${level}] ${formattedArgs}\n`;
  try {
    fs.appendFileSync(logFilePath, line, "utf8");
  } catch (err) {
    // Ignore log writing errors
  }
}

console.log = (...args: any[]) => {
  originalLog(...args);
  writeLog("INFO", ...args);
};

console.error = (...args: any[]) => {
  originalError(...args);
  writeLog("ERROR", ...args);
};

console.warn = (...args: any[]) => {
  originalWarn(...args);
  writeLog("WARN", ...args);
};

async function startServer() {
  const PORT = 3000;
  const app = createApiApp();

  // Serve with Vite in dev, static built assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
