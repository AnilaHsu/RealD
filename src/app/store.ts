import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["newsSlice"],
};
const newsPersistConfig = {
  key: "news",
  storage: storage,
  whitelist: ["category", "countryName", "countryCode"],
};

const rootReducer = combineReducers({
  news: persistReducer(newsPersistConfig, newsReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// storage.removeItem('persist:news')
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
