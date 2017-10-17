import * as React from 'react';
import { Component } from 'react';
import InstitutionsContainer from './InstitutionsContainer';
import DepartmentDBsContainer from './DepartmentDBsContainer';
import FederalInstitutionsContainer from './FederalInstitutionsContainer';
import {
    Button,
    Layout,
    Icon
} from 'antd';
// import { connect } from 'react-redux';
// import { ApplicationState } from '../store';
import AnimatedAside from '../components/AnimatedAside';
import Staggered from '../components/Staggered';

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
                        <Staggered>
                            FEDERAL INSTITUTION MANAGER
                        </Staggered>
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
                    <DepartmentDBsContainer />
                </AnimatedAside>
            </Layout>
        );
    }
}