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
      if (error.response.status === 404) {
        return rejectWithValue("Teacher not found");
      }
      if (error.response.status === 401) {
        return rejectWithValue("Invalid Password");
      }
      if (error.response.status === 500) {
        return rejectWithValue("Sever error");
      }
      return rejectWithValue("An error occurred. Please try again.");
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
      if (error.response.status === 409) {
        return rejectWithValue("Teacher already exists with this email.");
      }
      if (error.response.status === 500) {
        return rejectWithValue("Sever error");
      }
      return rejectWithValue("An error occurred. Please try again.");
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
    clearError: (state) => {
      state.error = null;
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

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
