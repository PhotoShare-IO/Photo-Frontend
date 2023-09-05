import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import posts from "./posts";

const rootReducer = combineReducers({
  auth,
  posts,
});

export const store = configureStore({ reducer: rootReducer });
