import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
    
    const [nombreGasto, guardarNombreGasto] = useState('');
    const [cantidadGasto, guardarCantidadGasto] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        if(cantidadGasto < 1 || isNaN(cantidadGasto) || nombreGasto.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()
        };

        guardarGasto(gasto);
        guardarCrearGasto(true);
        guardarNombreGasto('');
        guardarCantidadGasto(0);


    };

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto"/> : null }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="ej. Transporte"
                    value={nombreGasto}
                    onChange={ e => guardarNombreGasto(e.target.value) }
                />
            </div>

            <div className="campo">
                <label>Cantitad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="ej. 300"
                    value={ isNaN(cantidadGasto) ? 0 : cantidadGasto }
                    onChange={ e => {
                        if(!isNaN(e.target.value))
                            guardarCantidadGasto(parseInt(e.target.value))
                        else
                            guardarCantidadGasto(0);
                    } }
                />
            </div>

            <button 
                type="submit" 
                className="button-primary u-full-width">Agregar gasto</button>
        </form>

     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
};
 
export default Formulario;
