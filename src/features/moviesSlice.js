import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "a95b4f52";

const initialState = {
  movies: [],
  currentMovieDetails: {},
  isLoading: false,
  error: null,
  favoriteMovies: [],
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async function (searchTerm) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );
    const data = await res.json();
    console.log(data.Search);
    return data.Search;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async function (movieId) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const getFromLocalStorage = createAsyncThunk(
  "movies/getFromLocalStorage",
  () => {
    let items = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(items);
    return items;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong!";
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.isLoading = false;
        state.error = "something went wrong!";
      })
      .addCase(getFromLocalStorage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.favoriteMovies = action.payload;
      });
  },
});

export default moviesSlice.reducer;
