import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Media {
  Title: string;
  Year: string;
  imdbID: string;
}

interface ContentState {
  mediaList: Media[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  mediaList: [],
  loading: false,
  error: null,
};

export const fetchMedia = createAsyncThunk(
  "mediaList/fetchMedia",
  async (searchTerm: string | undefined = "Pokemon") => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=624b7f7b`
    );
    const data = await response.json();
    return data.Search;
  }
);

const mediaSlice = createSlice({
  name: "mediaList",
  initialState,
  reducers: {},
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
      });
  },
});

export default mediaSlice.reducer;
