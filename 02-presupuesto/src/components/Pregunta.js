import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    const [cantidad, guardarCantidad] = useState(0);
    const [cantidadValida, guardarCantidadValida] = useState(false);

    const definirPresupuesto = e => {
        const presupuesto = parseInt(e.target.value);
        guardarCantidad(presupuesto);
    }

    const agregarPresupuesto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad)){
            guardarCantidadValida(true);
            return;
        }

        guardarCantidadValida(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }


    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { cantidadValida ? <Error mensaje="El presupuesto es incorrecto"/> : null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <button 
                    type="submit"
                    className="button-primary u-full-width"
                >
                    Definir Presupuesto
                </button>
            </form>
        </Fragment>

     );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
};
 
export default Pregunta;