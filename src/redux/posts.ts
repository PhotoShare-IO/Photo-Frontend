import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Posts, Post} from "./types";
import {axiosInstance} from "../services/axios";
import {AxiosResponse} from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response: AxiosResponse<Post[]> = await axiosInstance("api/posts/");
    return response?.data
  } catch (e: unknown) {
    console.log(e)
  }
});

const initialState: Posts = {
  isLoading: false,
  isError: false,
  posts: []
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // TODO: remove ts-ignore
  extraReducers: {
    // @ts-ignore
    [fetchPosts.pending]: (state: Posts) => {
      state.isLoading = true;
      state.isError = false;
    },
    // @ts-ignore
    [fetchPosts.fulfilled]: (state: Posts, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    },
    // @ts-ignore
    [fetchPosts.rejected]: (state: Posts) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {} = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts; // TODO: change state ts-type

export default postsSlice.reducer;
