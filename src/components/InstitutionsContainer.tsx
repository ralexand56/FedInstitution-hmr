import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    InstitutionState,
} from '../services/data-types';
import * as actions from '../actions/InstitutionActions';
import Institutions from './Institutions';

type Props = InstitutionState &
    typeof actions.actionCreators;

class InstitutionsContainer extends Component<Props, {}> {

    render() {
        return (
            <Institutions {...this.props} />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionsContainer);