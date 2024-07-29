import { Router } from "express";

import fingerPrintingRouter from "./fingerPrintingRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/finger-printing`,
    router: fingerPrintingRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
