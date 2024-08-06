import { Router } from "express";
import { fingerPrintingController } from "../controller/index.js";

const fingerPrintingRouter = Router();

fingerPrintingRouter
  .route("/")
  .post(fingerPrintingController.detectFingerprint)
  .get(fingerPrintingController.getAllScripts);

export default fingerPrintingRouter;
