import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../types/validate.type";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<Omit<AuthState, "isAuthenticated">>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
