import { configureStore } from "@reduxjs/toolkit";
import { fingerPrintingApi } from "../api/fingerPrinting";

const store = configureStore({
  reducer: {
    [fingerPrintingApi.reducerPath]: fingerPrintingApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fingerPrintingApi.middleware]),
});

export default store;
