import * as React from 'react';
import { Component } from 'react';
import MainHeader from '../components/MainHeader';
import {
    ApplicationState,
} from '../store';
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
            <MainHeader
                {...this.props}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBSlice,
    actions.actionCreators
)(DepartmentDBsContainer);