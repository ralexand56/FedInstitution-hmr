import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const March = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Fade = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const LoaderImage = styled.img`
    animation: ${March} 2s ease-out infinite alternate;
    width: 30px;
    height: 40px;
    margin: 10px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 1.5em;
    font-style: italic;
    animation: ${Fade} 2s ease-out infinite alternate;
`;

interface Props {
    src?: string;
    title?: string;
}

const Loader = ({ src = 'logo.png', title = 'Searching...' }: Props) => {
    return (
        <MainContainer>
            <LoaderImage src={src} />
            <Title>{title}</Title>
        </MainContainer>
    );
};

export default Loader;