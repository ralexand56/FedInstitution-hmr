import * as React from 'react';
import { Component } from 'react';
// import { connect } from 'react-redux';
// import { ApplicationState } from '../store';
import AnimatedAside from '../components/AnimatedAside';
// import * as DepartmentDBStore from '../store/DepartmentDBReducer';
// import {
//     DepartmentDBState,
// } from './../services/data-types';

// type StoreProps = DepartmentDBState &
//     typeof DepartmentDBStore.actionCreators;

interface AppState {
    selectedState: Array<string> | null;
    isOn: boolean;
}

export default class StoreContainer extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedState: null,
            isOn: true,
        };
    }

    toggle = () => {
        this.setState({ isOn: !this.state.isOn });
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle}>On</button>
                <AnimatedAside isOn={this.state.isOn} toggle={this.toggle} >
                    <h1>Rico Alexander</h1>
                </AnimatedAside>
            </div>
        );
    }
}

// export default connect(
//     (state: ApplicationState) => state.departmentDBs,
//     DepartmentDBStore.actionCreators
// )(StoreContainer);