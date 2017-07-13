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

        return (
            <InstitutionList
                {...this.props}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionContainer);