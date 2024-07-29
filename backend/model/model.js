import { model } from "mongoose";

import fingerPrintSchema from "./schemas/fingerPrintSchema";

export const Fpcode = model("Fpcode", fingerPrintSchema);
