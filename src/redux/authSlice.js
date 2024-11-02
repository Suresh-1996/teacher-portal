// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Async actions for signing in and signing up
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/teachers/signin", credentials);
      return response.data; // Expecting JWT token and user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/teachers/signup", userData);
      return response.data; // Expecting JWT token and user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
