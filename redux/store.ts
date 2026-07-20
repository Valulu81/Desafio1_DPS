import { configureStore } from "@reduxjs/toolkit";
import peliculasReducer from "./slices/peliculasSlice";

export const store = configureStore({
  reducer: {
    peliculas: peliculasReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;