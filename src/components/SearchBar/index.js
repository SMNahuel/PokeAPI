import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonsByName, getPokemons } from '../../store/slices/thunk';
import style from './style.module.css';

const SearchBar = () => {
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const submitFormHandler = () => {
        console.log(name)
        if(name === ''){
            dispatch(getPokemons(name));
        }else{
            dispatch(getPokemonsByName(name));
        }
    };

    return (
        <div className={style.container}>
            <input
                type='text'
                placeholder='Ingrese un pokemon'
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        submitFormHandler();
                    }
                }}
            />
        </div>
    )
}

export default SearchBar;