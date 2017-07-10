import * as React from 'react';
import { Component } from 'react';
import InstitutionsContainer from './InstitutionsContainer';
import DepartmentDBsContainer from './DepartmentDBsContainer';
// import DepartmentDBList from '../components/DepartmentDBList';
import 'antd/dist/antd.css';
import { Button } from 'antd';
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
                <InstitutionsContainer />
                <AnimatedAside isOn={this.state.isOn} toggle={this.toggle} >
                    <DepartmentDBsContainer />
                </AnimatedAside>
                 <Button onClick={this.toggle} type="primary" ghost={true}>Show DeptDB</Button>
            </div>
        );
    }
}