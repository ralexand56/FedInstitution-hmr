import * as actions from '../actions/FederalInstitutionActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    FederalInstitutionState,
} from '../services/data-types';
import
    FederalInstitutions from './FederalInstitutions';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

class FederalInstitutionsContainer extends Component<Props, {}> {

    render() {
        return (
            <FederalInstitutions {...this.props} />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.federalInstitutionSlice,
    actions.actionCreators
)(FederalInstitutionsContainer);