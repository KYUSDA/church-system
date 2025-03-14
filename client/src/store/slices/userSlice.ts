import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  // Define the properties of the user object here
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
