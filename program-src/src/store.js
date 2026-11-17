import { configureStore } from "@reduxjs/toolkit";
import dasRootReducer from "./reducers";
import ApiMiddleware from "./middleware/ApiMiddleware";

const rootReducer = {
  das_data: dasRootReducer,
};

const preloadedState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMiddleware),
  preloadedState,
});
