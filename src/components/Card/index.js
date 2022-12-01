import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';
import { setSelectedPokemon, setModal } from "../../store/slices/pokemonSlice";
const Card = ({ pokemons }) => {

    const dispatch = useDispatch();
    const modalIsOpen = React.useCallback((select) => {
        dispatch(setModal());
        dispatch(setSelectedPokemon(select.name));
    }, [])
    return (
        <>
            {
                pokemons && pokemons.map((item, key) => {
                    return (
                        <div key={key} className={style.card} onClick={() => modalIsOpen(item)}>

                            <div>
                                <p className={style.pokemonName}>{item.name.toUpperCase()}</p>
                                <img
                                    src={item.sprites ?
                                        item.sprites.front_default
                                        :
                                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split("/")[item.url.split("/").length - 2]}.png`}
                                    alt={item.name}
                                />
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}

export default React.memo(Card);