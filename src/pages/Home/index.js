import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from '../../store/slices/thunk';
import { SearchBar } from '../../components';
import style from './style.module.css';
import Modal from 'react-modal';
import {
    useGetPokemonDetailQuery,
    useGetPokemonFlavorTextQuery,
} from "../../store/api";
import { setSelectedPokemon } from "../../store/slices/pokemonSlice";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};

const Home = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false)
    const [pokemonFlavorText, setPokemonFlavorText] = useState(null);

    const { pokemons = [], page } = useSelector((state) => state.pokemon);
    const { selectedPokemon } = useSelector((state) => state.pokemon);

    const { data: pokemon } = useGetPokemonDetailQuery(selectedPokemon);

    const { data: flavorText, isLoading: loadingFlavorText } = useGetPokemonFlavorTextQuery(selectedPokemon);

    const modalIsOpen = (select) => {
        dispatch(setSelectedPokemon(select.name));
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setPokemonFlavorText(null)
    }

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    useEffect(() => {
        if (!loadingFlavorText) {
            let findSpanishFlavor = flavorText.flavor_text_entries.find(
                (flavor) => flavor.language.name === "es"
            );

            if (findSpanishFlavor) {
                setPokemonFlavorText(findSpanishFlavor.flavor_text);
            } else {
                setPokemonFlavorText(flavorText.flavor_text_entries[0].flavor_text);
            }
        }
    }, [loadingFlavorText, flavorText]);

    return (
        <>
            <SearchBar />

            <div className={style.cardGrid}>
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
            </div>
            <div className={style.pagination}>
                <div
                    className={style.prevButton}
                    onClick={() => {
                        if (page !== 1) {
                            dispatch(getPokemons(page - 2));
                        }
                    }}
                ></div>
                <div className={style.pagination}>{page}</div>
                <div
                    className={style.nextButton}
                    onClick={() => {
                        dispatch(getPokemons(page));
                    }}
                ></div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className={style.modal}>
                    {!pokemonFlavorText ? (
                        <div>
                            <Skeleton height={100} width={100}/>
                        </div>
                    ) : (
                        <>
                            <div>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                            <div>{`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(
                                1
                            )}:`}</div>
                            <div>
                                {pokemonFlavorText.split("\n").map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                ))}
                            </div>
                        </>
                    )}
                <button onClick={() => closeModal()}>Cerrar</button>
                </div>
            </Modal>
        </>
    )
}

export default Home;