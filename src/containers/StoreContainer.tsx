import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { AnalogGauge } from '../components/AnalogGauge';
import * as DepartmentDBStore from '../store/DepartmentDBReducer';
import {
    DepartmentDBState,
} from './../services/data-types';
import { Motion, spring, presets } from 'react-motion';

type StoreProps = DepartmentDBState &
    typeof DepartmentDBStore.actionCreators;

interface AppState {
    selectedState: Array<string> | null;
}

export class StoreContainer extends Component<StoreProps, AppState> {
    constructor(props: StoreProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                {
                    this.props.departmentDBs.map((d, ind) => (
                        <Motion
                            key={ind}
                            defaultStyle={{ x: 0 }}
                            style={{ x: spring(d.Pct * 100, presets.gentle) }}
                        >
                            {value => <AnalogGauge value={value.x} />}
                        </Motion>
                    ))
                 }
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBs,
    DepartmentDBStore.actionCreators
)(StoreContainer);