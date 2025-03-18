import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../Dashboard/components/userdata";


interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: TUser | null;
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
    login: (state, action: PayloadAction<{ user: TUser; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    updateTrivias: (state, action: PayloadAction<{ key: string; number: number }>) => {
      if (state.user && action.payload.key in state.user) {
        state.user = {
          ...state.user,
          [action.payload.key]: action.payload.number,
        };
      }
    },

}});

export const { login, logout,updateTrivias } = authSlice.actions;
export default authSlice.reducer;
