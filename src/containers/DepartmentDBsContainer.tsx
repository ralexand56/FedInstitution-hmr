import * as React from 'react';
import { Component } from 'react';
import DepartmentDBList from '../components/DepartmentDBList';
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
        let { departmentDBs, selectDeptDB } = this.props;

        return (
            <DepartmentDBList
                departmentDBs={departmentDBs}
                selectDeptDB={selectDeptDB}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBs,
    actions.actionCreators
)(DepartmentDBsContainer);