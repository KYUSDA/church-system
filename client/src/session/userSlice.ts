import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      userId: string;
      role: string;
    };
  };
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
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
    },
    logout: (
      state
    ) => {
      state.user = null;
      state.isAuthenticated = false;
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
export const { login, logout, updateTrivias } =
  authSlice.actions;
export default authSlice.reducer;
