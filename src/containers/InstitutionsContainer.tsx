import * as React from 'react';
import { Component } from 'react';
import {
    ApplicationState,
} from '../store';
import { InstitutionList } from '../components/InstitutionList';
import {
    InstitutionState,
} from './../services/data-types';
import * as actions from '../actions/InstitutionActions';
import { connect } from 'react-redux';

type Props = InstitutionState &
    typeof actions.actionCreators;

export class InstitutionContainer extends Component<Props, {}> {

    render() {
        let {
            activeDeptDB,
            activeInstitutions,
            institutionFilter,
            selectedInstitutionIDs,
            setInstitutionFilter,
            updateInstitutionSelection,
        } = this.props;

        return (
            activeDeptDB &&
            (
                <InstitutionList
                    activeDeptDB={activeDeptDB}
                    activeInstitutions={activeInstitutions}
                    institutionFilter={institutionFilter}
                    setInstitutionFilter={setInstitutionFilter}
                    selectedInstitutionIDs={selectedInstitutionIDs}
                    updateInstitutionSelection={updateInstitutionSelection}
                />)
        );
    }
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionContainer);