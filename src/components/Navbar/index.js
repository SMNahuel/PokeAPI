import React from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from '../../store/slices/thunk';

const Navbar = () => {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.pokemon);

    return (
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
    )
}

export default Navbar;