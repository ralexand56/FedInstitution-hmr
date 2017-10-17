import * as React from 'react';
import { DepartmentDBState } from '../services/data-types';
import {
    Card,
    Input,
    Layout,
} from 'antd';
import * as actions from '../actions/DepartmentDBActions';
import Stagger from '../components/Stagger';
import styled from 'styled-components';

const Header = Layout.Header;
// const Content = Layout.Content;
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

type Props =
    DepartmentDBState &
    typeof actions.actionCreators;

const DepartmentDBList: React.SFC<Props> = ({ departmentDBs, selectDeptDB, requestDepartmentDBs }) => {

    return (
        <MainContainer>
            <Header>
                <h2 style={{ color: 'white', margin: '8px 0' }}>
                    DEPARTMENT DATABASES
                </h2>
            </Header>
            <ContentContainer>
                <Input placeholder="...search name" onChange={(e) => requestDepartmentDBs(e.currentTarget.value)} />
                {
                    departmentDBs &&
                    <Stagger>
                        {
                            departmentDBs.map(d =>
                                <div
                                    key={d.DeptDBID}
                                    onClick={() => selectDeptDB(d)}
                                >
                                    <Card
                                        bordered={true}
                                        style={{ width: 300, marginBottom: 20 }}
                                        title={d.Name}
                                        loading={true}
                                    />
                                </div>)}
                    </Stagger>
                }
            </ContentContainer>
        </MainContainer>
    );
};

export default DepartmentDBList;