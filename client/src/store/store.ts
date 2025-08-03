import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../session/userSlice";
import { api } from "../services/authService";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { adminApi } from "../services/adminService";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const persistAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    [api.reducerPath]: api.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(adminApi.middleware),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
