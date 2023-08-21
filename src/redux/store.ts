import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({ reducer: rootReducer });
