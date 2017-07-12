import * as React from 'react';
import {
    FederalInstitutionState,
} from '../services/data-types';
import {
    Layout,
    Input,
} from 'antd';

// const Option = Select.Option;
const Header = Layout.Header;
const Content = Layout.Content;

const FederalInstitutionList = ({ fedInstitutions }: FederalInstitutionState) => {
    return (
        <Layout>
            <Header>
                <h1>Federal Institutions</h1>
                <Input />
            </Header>

            <Content>
                <h1>Federal Institutions</h1>
            </Content>
        </Layout>
    );
};

export default FederalInstitutionList;