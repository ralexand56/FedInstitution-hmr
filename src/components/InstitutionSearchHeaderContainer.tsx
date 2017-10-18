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
import InstitutionSearchHeader from './InstitutionSearchHeader';

type Props = InstitutionState &
    typeof actions.actionCreators;

class InstitutionSearchHeaderContainer extends Component<Props, {}> {

    render() {
        return (
            <InstitutionSearchHeader {...this.props} />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionSearchHeaderContainer);