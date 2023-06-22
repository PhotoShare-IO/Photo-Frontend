import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number | null;
  email: string | null;
  username: string | null;
  first_name: string | null;
  surname: string | null;
  profile_photo: string | null;
  is_staff: boolean | null;
  is_superuser: boolean | null;
}

const initialState: User = {
  id: null,
  email: null,
  username: null,
  first_name: null,
  surname: null,
  profile_photo: null,
  is_staff: null,
  is_superuser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User, action) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
