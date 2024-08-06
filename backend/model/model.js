import { model } from "mongoose";

import fingerPrintSchema from "./schemas/fingerPrintSchema.js";

export const Fpcode = model("Fpcode", fingerPrintSchema);
