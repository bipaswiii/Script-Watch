import { Schema } from "mongoose";

const fingerPrintSchema = Schema(
  {
    data: String,
  },
  { timestamps: true }
);

export default fingerPrintSchema;
