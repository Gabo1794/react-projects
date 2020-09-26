import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
//Para documentar componentes
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada que se escribe en un input

    const actualizarState = evento =>{
        actualizarCita({
            ...cita,
            [evento.target.name]: evento.target.value
        });
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita;


    const submitCita = (e) => {
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //quitar mensaje de error.
        actualizarError(false);

        //Asignar un Id
        cita.id= uuid();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''            
        })
    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los capos son obligatorios</p> : null }
            
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>

                <button
                    type="sumit"
                    className="u-full-width button-primary"
                >
                    Agregar Citas
                </button>
            </form>
        </Fragment>
     );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;