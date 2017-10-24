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
    z-index: 2;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const StyledCard = styled(Card) `
    width: 300px;
    margin-bottom: 10px;
`;

type Props =
    DepartmentDBState &
    typeof actions.actionCreators;

const DepartmentDBList: React.SFC<Props> = ({ activeDeptDB, departmentDBs, selectDeptDB, requestDepartmentDBs }) => {

    return (
        <MainContainer>
            <Header>
                <h3 style={{ color: 'white', margin: '8px 0' }}>
                    DEPARTMENT DATABASES
                </h3>
            </Header>
            <ContentContainer>
                <Input
                    placeholder="...search name"
                    onChange={(e) => requestDepartmentDBs(e.currentTarget.value)}
                    style={{ margin: 10 }}
                />
                {
                    departmentDBs &&
                    <Stagger>
                        {
                            departmentDBs.map(d =>
                                <div
                                    key={d.DeptDBID}
                                    onClick={() => selectDeptDB(d)}
                                >
                                    <StyledCard
                                        bordered={true}
                                        title={d.Name}
                                        loading={activeDeptDB && activeDeptDB.DeptDBID === d.DeptDBID ? true : false}
                                    />
                                </div>)}
                    </Stagger>
                }
            </ContentContainer>
        </MainContainer>
    );
};

export default DepartmentDBList;