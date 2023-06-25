import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number | null;
  email: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_photo: string | null;
  is_staff: boolean | null;
  is_superuser: boolean | null;
}

const initialState: User = {
  id: null,
  email: null,
  username: null,
  first_name: null,
  last_name: null,
  profile_photo: null,
  is_staff: null,
  is_superuser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User, { payload }) => {
      return state = { ...state, ...payload };
    },
    removeUser: (state: User) => {
      return state = initialState
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: User) => state;

export default userSlice.reducer;
