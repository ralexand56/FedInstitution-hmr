import React, { Component } from 'react';
import DepartmentDBList from '../components/DepartmentDBList';
import {
    DepartmentDBState,
} from './../services/data-types';
import * as actions from '../actions/DepartmentDBActions';
import { connect } from 'react-redux';

type Props = DepartmentDBState &
    typeof actions.actionCreators;

export class DepartmentDBsContainer extends Component<Props, {}> {

    render() {

        return (
            <DepartmentDBList
            />
        );
    }
}

export default connect(
    (state: DepartmentDBState) => state,
    actions.actionCreators
)(DepartmentDBsContainer);