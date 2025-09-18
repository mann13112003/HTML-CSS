import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/validate.type";
import { api } from "../services/authApi";
import type { UserLogin } from "../types/validate.type";
import type { AxiosError } from "axios";
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

//login
export const login = createAsyncThunk(
  "user/login",
  async (data: UserLogin, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);
//getProfile
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/profile");
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      return rejectWithValue(err.response?.data?.error || "Get profile fail!");
    }
  }
);

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (data: string | undefined, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/logout", { data });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      return rejectWithValue(err.response?.data?.error || "Get profile fail!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //user login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      //get user profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
