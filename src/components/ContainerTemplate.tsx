import * as actions from '../actions/FederalInstitutionActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    FederalInstitutionState,
} from '../services/data-types';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {

        return (
            <div>
                Template
            </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.federalInstitutionSlice,
    actions.actionCreators
)(ContainerTemplate);