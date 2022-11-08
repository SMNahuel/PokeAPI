import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./api";
import { pokemonSlice } from "./slices";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,

    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});