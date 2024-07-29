import { config } from "dotenv";

config();

export const port = process.env.PORT || 8001;
export const dbUrl = process.env.DB_URL;
export const baseUrl = process.env.BASE_URL;
