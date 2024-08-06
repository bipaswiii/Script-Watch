import express, { json } from "express";
import { config } from "dotenv";
import { port, apiVersion } from "./config/config.js";
import { connectDb } from "./connectDb/db.js";
import cors from "cors";
import apiRouter from "./routes/index.js";

const expressApp = express();
config();

expressApp.use(cors());
expressApp.use(json());

expressApp.use(`${apiVersion}`, apiRouter);

connectDb();

expressApp.listen(port, () => {
  console.log(`The port is listening at ${port}`);
});
