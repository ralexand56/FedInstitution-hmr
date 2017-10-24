import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    DepartmentDBState,
} from '../services/data-types';
import * as actions from '../actions/DepartmentDBActions';
import AnimatedAside from './AnimatedAside';
import DepartmentDBsContainer from './DepartmentDBsContainer';

type Props = DepartmentDBState &
    typeof actions.actionCreators;

class AnimatedAsideContainer extends Component<Props, {}> {

    render() {
        const {
            showDeptDBs,
            toggleDepartmentVisibility
        } = this.props;

        return (
            <AnimatedAside isOn={showDeptDBs} toggle={toggleDepartmentVisibility}>
                <DepartmentDBsContainer />
            </AnimatedAside >
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBSlice,
    actions.actionCreators
)(AnimatedAsideContainer);