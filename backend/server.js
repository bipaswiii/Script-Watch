import express, { json } from "express";
import { config } from "dotenv";
import { port } from "./config/config.js";
import { connectDb } from "./connectDb/db.js";
import cors from "cors";

const expressApp = express();
config();

expressApp.use(cors());
expressApp.use(json());

connectDb();

expressApp.listen(port, () => {
  console.log(`The port is listening at ${port}`);
});
