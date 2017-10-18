import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import InstitutionsContainer from './InstitutionsContainer';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Helvetica';
    font-size: 2em;
    height: 100%;
`;

export default class HomeContainer extends Component<{}, {}> {

    render() {
        return (
            <MainContainer>
                <InstitutionsContainer />
                <div>
                    Federal Institutions
                </div>
            </MainContainer>
        );
    }
}