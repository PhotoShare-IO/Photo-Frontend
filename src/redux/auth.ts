import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, LoginData } from "./types";
import {
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from "../services/tokens";

const initialState: Auth = {
  token: "",
  user: {
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    profile_photo: "",
    is_staff: false,
    is_superuser: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginData>): void => {
      const { tokens } = action.payload;
      if (tokens && tokens.access && tokens.refresh) {
        localStorage.clear();
        setAccessToken(tokens.access);
        setRefreshToken(tokens.refresh);
        state.token = tokens.access;
      }
      const { id, email, username, first_name, last_name } = action.payload;
      state.user = {
        id: id,
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        profile_photo: "",
        is_staff: false,
        is_superuser: false,
      };
    },
    logOut: (): Auth => {
      removeTokens();
      return initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectUser = (state: any) => state.auth.user; // TODO: change state ts-type

export default authSlice.reducer;
