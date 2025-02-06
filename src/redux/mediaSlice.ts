import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Media, MediaDetail } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

interface MediaState {
  mediaList: Media[];
  mediaDetail: MediaDetail | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: MediaState = {
  mediaList: [],
  mediaDetail: null,
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchMedia = createAsyncThunk(
  "mediaList/fetchMedia",
  async ({
    searchTerm = "Pokemon",
    page = 1,
    year = "",
    type = "",
  }: {
    searchTerm?: string;
    page?: number;
    year?: string;
    type?: string;
  }) => {
    const yearQuery = year ? `&y=${year}` : "";
    const typeQuery = type ? `&type=${type}` : "";
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}${yearQuery}${typeQuery}&page=${page}&apikey=${API_KEY}`
    );

    const data = await response.json();
    return data.Search;
  }
);
export const fetchMediaDetail = createAsyncThunk(
  "mediaList/fetchMediaDetail",
  async (imdbId: string) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }
);

const mediaSlice = createSlice({
  name: "mediaList",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaList = action.payload;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the content.";
      })
      .addCase(fetchMediaDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaDetail = action.payload;
      })
      .addCase(fetchMediaDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch media details.";
      });
  },
});

export const { setPage } = mediaSlice.actions;

export default mediaSlice.reducer;
