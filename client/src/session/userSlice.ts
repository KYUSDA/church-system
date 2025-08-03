import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface User {
  id: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  sessionExpired: boolean;
  logoutReason: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  sessionExpired: false,
  logoutReason: null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.sessionExpired = false;
      state.logoutReason = null;
    },
    logout: (
      state,
      action: PayloadAction<{ reason?: string; showAlert?: boolean }>
    ) => {
      state.user = null;
      state.isAuthenticated = false;
      state.sessionExpired = action.payload.showAlert || false;
      state.logoutReason = action.payload.reason || null;
    },

    clearSessionAlert: (state) => {
      state.sessionExpired = false;
      state.logoutReason = null;
    },

    updateTrivias: (
      state,
      action: PayloadAction<{ key: string; number: number }>
    ) => {
      if (state.user && action.payload.key in state.user) {
        state.user = {
          ...state.user,
          [action.payload.key]: action.payload.number,
        };
      }
    },
  },
});
export const { login, logout, updateTrivias,clearSessionAlert } =
  authSlice.actions;
export default authSlice.reducer;
