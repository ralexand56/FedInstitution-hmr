import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import AnimatedAsideContainer from './AnimatedAsideContainer';
import InstitutionsContainer from './InstitutionsContainer';
import FederalInstitutionsContainer from './FederalInstitutionsContainer';
import MainHeaderContainer from './MainHeaderContainer';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Arial';
    font-size: 1.2em;
    height: 100%;
`;

export default class HomeContainer extends Component<{}, {}> {

    render() {
        return (
            <MainContainer>
                <MainHeaderContainer />
                <InstitutionsContainer />
                <FederalInstitutionsContainer />
                <AnimatedAsideContainer />
            </MainContainer>
        );
    }
}