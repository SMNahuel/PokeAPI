import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    page: 0,
    pokemons: [],
    selectedPokemon: 1,
    loading: false,
    error: null,
    showModal: false
  },
  reducers: {
    setLoading: (state /* action */) => {
      state.loading = true;
    },
    setPokemons: (state, action) => {
      state.loading = false;
      state.page = Math.floor(action.payload.page);
      state.pokemons = action.payload.pokemons;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cleanSelectedPokemon : (state, action) => {
      state.selectedPokemon = 1;
    },
    setModal: (state, action) => {
      state.showModal = !state.showModal
    }
  },
});
// Action creators are generated for each case reducer function
export const {setModal, setLoading, setPokemons, setSelectedPokemon, setError } =
  pokemonSlice.actions;