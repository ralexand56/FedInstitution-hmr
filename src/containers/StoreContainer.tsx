import * as React from 'react';
import { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
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
                    <Card style={{width: 300}} title={'Rico Alexander'} loading={true} />
                </AnimatedAside>
            </div>
        );
    }
}

// export default connect(
//     (state: ApplicationState) => state.departmentDBs,
//     DepartmentDBStore.actionCreators
// )(StoreContainer);