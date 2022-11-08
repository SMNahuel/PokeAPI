import axios from "axios";
import { setError, setLoading, setPokemons } from "./pokemonSlice";

export const getPokemonsByName = (name) => {
    return async (dispatch, getState) => {
        dispatch(setLoading());

        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => {
                console.log(res)
                dispatch(setPokemons({ pokemons: [res.data] }));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setError(err));
            });
    };
};

export const getPokemons = (page = 0) => {
    return async (dispatch, getState) => {
      dispatch(setLoading());
  
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page * 12}`)
        .then((res) => {
          dispatch(setPokemons({ page: page + 1, pokemons: res.data.results }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setError(err));
        });
    };
  };