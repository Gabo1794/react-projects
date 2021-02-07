import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import Phrases  from "./components/Phrases";

const Button = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: backgraund-size .8s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

/*
() => getPhrase() --> espera el clic
getPhrase --> espera el clic
getPhrase() --> se ejecuta al cargar el componente
*/

function App() {

  const [phraseBreaking, setPhraseBreaking] = useState({});

  useEffect( () => {
    getPhrase()
  },[])

  const getPhrase = async () => {
    const result = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const phrase = await result.json();
    setPhraseBreaking(phrase[0]);
  };

  return (
    <Container>
      <Phrases
        phrase={phraseBreaking}
      />      
      <Button
        onClick={() => getPhrase()}
      >
        Obtener frase
      </Button>
    </Container>
  );
}

export default App;
