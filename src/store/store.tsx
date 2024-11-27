import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import {rootReducer} from "@reducers/index";

const middleware: any = [];
middleware.push(createLogger());
const enhancers = [...middleware];

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    window.location.hostname === "localhost"
      ? getDefaultMiddleware().concat(enhancers)
      : getDefaultMiddleware(),
});