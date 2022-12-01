import React, { useEffect } from "react";
import { Card, SearchBar, Navbar } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from '../../store/slices/thunk';
import ContainerModal from "../../components/Modal";
import style from './style.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const { pokemons, showModal } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getPokemons());
    }, []);

    return (
        <>
            <SearchBar />
            <div className={style.cardGrid}>
                <Card pokemons={pokemons} />
            </div>
            <Navbar />
            {
                showModal && <ContainerModal />
            }
        </>
    )
}

export default Home;