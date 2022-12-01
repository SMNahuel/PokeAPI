import React, { useEffect, useState} from 'react';
import Modal from 'react-modal';
import style from './style.module.css';
import Skeleton from 'react-loading-skeleton';
import {
    useGetPokemonDetailQuery,
    useGetPokemonFlavorTextQuery,
} from "../../store/api";
import { setModal } from "../../store/slices/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

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

const ContainerModal = () => {
    const dispatch = useDispatch();
    const { selectedPokemon, showModal } = useSelector((state) => state.pokemon);
    const { data: pokemon } = useGetPokemonDetailQuery(selectedPokemon);
    const { data: flavorText, isLoading: loadingFlavorText } = useGetPokemonFlavorTextQuery(selectedPokemon);
    const [pokemonFlavorText, setPokemonFlavorText] = useState(null);

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
        <Modal
            isOpen={showModal}
            onRequestClose={() => dispatch(setModal())}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className={style.modal}>
                {!pokemonFlavorText ? (
                    <div>
                        <Skeleton height={100} width={100} />
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
                <button onClick={() => dispatch(setModal())}>Cerrar</button>
            </div>
        </Modal>
    )
}

export default React.memo(ContainerModal);