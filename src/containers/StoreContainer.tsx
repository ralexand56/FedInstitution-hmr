import * as React from 'react';
import { Component } from 'react';
import InstitutionsContainer from './InstitutionsContainer';
import DepartmentDBsContainer from './DepartmentDBsContainer';
import FederalInstitutionsContainer from './FederalInstitutionsContainer';
import Staggered from '../components/Staggered';
// import DepartmentDBList from '../components/DepartmentDBList';
import 'antd/dist/antd.css';
import {
    Button,
    Layout,
    Icon
} from 'antd';
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

const Header = Layout.Header;
const Content = Layout.Content;

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
            <Layout
                style={{
                    height: '100%',
                }}
            >
                <Header style={{ padding: 0 }}>
                    <h1 style={{ color: 'white' }}>
                        <Button style={{ margin: '0 10px' }} onClick={this.toggle} ghost={true}>
                            <Icon type="menu-fold" />
                        </Button>
                        FEDERAL INSTITUTION MANAGER
                        </h1>
                </Header>
                <Content
                    style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                        } as React.CSSProperties}
                >
                    <div style={{ flex: 1, overflow: 'auto' }}>
                        <InstitutionsContainer />
                    </div>
                    <div>
                        <FederalInstitutionsContainer />
                    </div>
                </Content>
                <AnimatedAside isOn={this.state.isOn} toggle={this.toggle} >
                    <Staggered>
                        <h2>Rico</h2>
                        <h2>Hendry</h2>
                        <h2>Augi</h2>
                        <h2>Luther</h2>
                    </Staggered>
                    <DepartmentDBsContainer />
                </AnimatedAside>
            </Layout>
        );
    }
}