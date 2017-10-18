import * as actions from '../actions/FederalInstitutionActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    InstitutionState,
} from '../services/data-types';
import InstitutionList from './InstitutionsContainer';

type Props = InstitutionState &
    typeof actions.actionCreators;

class InstitutionsContainer extends Component<Props, {}> {

    render() {
        return (
            <InstitutionList />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionsContainer);