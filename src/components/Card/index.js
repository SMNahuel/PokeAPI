import React from 'react';
import style from './style.module.css';

const Card = (item) => {
    console.log(item);
    return (

        <p className={style.title}>{item.name}</p>

    )
}

export default Card;