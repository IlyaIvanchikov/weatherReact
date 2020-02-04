import React from 'react';

const Minsk  = props => (
        <div>
            <h2 className="minsk">МИНСК</h2>
            <p>Температура: {props.temp_minsk}</p>
            <p>Восход солнца: {props.sunrise_minsk}</p>
            <p>Заход солнца: {props.sunset_minsk}</p>
        </div>
);
export default Minsk;