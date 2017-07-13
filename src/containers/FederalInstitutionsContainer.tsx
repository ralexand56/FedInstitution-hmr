import * as React from 'react';
import { Component } from 'react';
import {
    ApplicationState,
} from '../store';
import FederalInstitutionList from '../components/FederalInstitutionList';
import {
    FederalInstitutionState,
} from './../services/data-types';
import * as actions from '../actions/FederalInstitutionActions';
import { connect } from 'react-redux';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

export class FederalInstitutionsContainer extends Component<Props, {}> {

    render() {

        return (
            <FederalInstitutionList {...this.props} />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.federalInstitutionSlice,
    actions.actionCreators
)(FederalInstitutionsContainer);