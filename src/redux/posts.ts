import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Posts, Post } from "./types";
import { axiosInstance } from "../services/axios";
import { AxiosResponse } from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response: AxiosResponse<Post[]> = await axiosInstance("api/posts/");
    return response?.data;
  } catch (e: unknown) {
    console.log(e);
  }
});

const initialState: Posts = {
  isLoading: false,
  isError: false,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // TODO: remove ts-ignore
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [fetchPosts.pending]: (state: Posts) => {
      state.isLoading = true;
      state.isError = false;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [fetchPosts.fulfilled]: (state: Posts, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [fetchPosts.rejected]: (state: Posts) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts; // TODO: change state ts-type

export default postsSlice.reducer;
