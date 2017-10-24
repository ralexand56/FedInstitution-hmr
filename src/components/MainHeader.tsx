import React from 'react';
import styled from 'styled-components';
import {
    DepartmentDBState,
} from './../services/data-types';
import * as actions from '../actions/DepartmentDBActions';
import {
    Button,
    Icon,
} from 'antd';

const MainContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 40px;
    display: flex;
    padding: 5px;
    align-items: center;
    color: white;
    background: #424242;
    box-shadow: 0px 0px 2px black;
    > h3 {
        color: white;
        font-size: 1.5em;
    }
`;

type Props = DepartmentDBState &
    typeof actions.actionCreators;

const MainHeader = ({ showDeptDBs, toggleDepartmentVisibility }: Props) => {
    return (
        <MainContainer>
            <Button
                style={{ margin: '0 10px' }}
                onClick={toggleDepartmentVisibility}
                ghost={true}
            >
                <Icon
                    type="menu-fold"
                />
            </Button>
            <h3>Federal Institution Manager</h3>
        </MainContainer>
    );
};

export default MainHeader;