import { createServer } from "http";
import express from "express";
import cors from "cors";

import { env } from "@sparcs-clubs/api/env";
import logger from "@sparcs-clubs/api/utils/logger";

const corsOrigin =
  env.NODE_ENV === "development" ? "*" : [/sparcs\.org$/, /kaist\.ac\.kr$/];

const app = express();
const httpServer = createServer(app);
const port = env.SERVER_PORT ?? 8000;

app.use(express.json());
app.use(cors({ origin: corsOrigin }));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(port);
logger.info(`Welcome to Clubs! Server listening on port ${port}`);
