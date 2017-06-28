import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import {AnalogGauge} from '../components/AnalogGauge';
import * as DepartmentDBStore from '../store/DepartmentDBReducer';
import {
    DepartmentDBState,
} from './../services/data-types';

type StoreProps = DepartmentDBState &
    typeof DepartmentDBStore.actionCreators;

interface AppState {
    selectedState: Array<string> | null;
}

export class StoreContainer extends Component<StoreProps, AppState> {
    constructor(props: StoreProps) {
        super(props);
    }

    render() {
        // const { activeInstitutions } = this.props;

        // return (
        //     <div>
        //         <h4>Header2</h4>
        //         {activeInstitutions.map((i) => <h4 key={i.InstitutionID}> {i.Name}</h4 >)}
        //     </div>
        // );
        return (
            <AnalogGauge value={0} />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBs,
    DepartmentDBStore.actionCreators
)(StoreContainer);