import React from 'react';

const Zhlobin  = props => (
    <div>
        <h2 className="zhlobin">ЖЛОБИН</h2>
        <p>Температура: {props.temp_zhlobin}</p>
        <p>Восход солнца: {props.sunrise_zhlobin}</p>
        <p>Заход солнца: {props.sunset_zhlobin}</p>
    </div>
);

export default Zhlobin;