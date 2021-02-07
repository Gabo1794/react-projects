import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { primerMayuscula } from "../helper";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = (props) => {
  const { datos } = props;

  const { marca, anio, plan } = datos;

  if (marca === "" || anio === "" || plan === "") return null;

  return (
    <ContenedorResumen>
      <h2>Resumen de Cotización</h2>
      <ul>
        <li>Marca: {primerMayuscula(marca)} </li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Año del auto: {anio}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
};

export default Resumen;
