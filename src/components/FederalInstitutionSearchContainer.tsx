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
    FederalInstitutionSearch
 from './FederalInstitutionSearch';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

class FederalInstitutionSearchContainer extends Component<Props, {}> {

    render() {
        const {
            fedInstitutions,
            fedInstitutionFilter,
            setFedInstitutionFilter,
            updateFedInstitutionFilter,
        } = this.props;

        return (
            <FederalInstitutionSearch
                fedInstitutions={fedInstitutions} 
                fedInstitutionFilter={fedInstitutionFilter}
                setFedInstitutionFilter={setFedInstitutionFilter}
                updateFedInstitutionFilter={updateFedInstitutionFilter}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.federalInstitutionSlice,
    actions.actionCreators
)(FederalInstitutionSearchContainer);