import React from "react";
import styled from '@emotion/styled';

const Div = styled.div`
    padding: 3rem;
    border-radius: .5rem;
    background-color: #fff;
    max-width: 800px;
    
    h1{
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        position: relative;
        padding-left: 4rem;

        &::before {
            content: open-quote;
            font-size: 10rem;
            color: black;
            position: absolute;
            left: -1rem;
            top: -2rem;
        }
    }

    p{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1.4rem;
        text-align: right;
        color: #666;
        margin-top: 2rem;
        font-weight: bold;
    }

    @media (min-width: 992px) {
        margin-top: 10rem;
    }
`;

const Phrases = ({phrase}) => {
    return(
        <Div>
            <h1>{phrase.quote}</h1>
            <p>{phrase.author}</p>
        </Div>
    );
}

export default Phrases;