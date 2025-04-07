import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../Dashboard/components/userdata";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: TUser | null;
  expiresAt: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  expiresAt: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: TUser;
        accessToken: string;
        expiresIn: number;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.expiresAt = null;
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
    updateAuthToken: (
      state,
      action: PayloadAction<{ accessToken: string; expiresAt: number }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
    },
  },
});

export const { login, logout, updateTrivias, updateAuthToken } = authSlice.actions;
export default authSlice.reducer;
