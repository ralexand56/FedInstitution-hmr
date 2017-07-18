import * as React from 'react';
import { DepartmentDBState } from '../services/data-types';
import {
    Card,
    Input,
    Layout,
} from 'antd';
import * as actions from '../actions/DepartmentDBActions';
import Staggered from '../components/Staggered';

const Header = Layout.Header;
const Content = Layout.Content;

type Props =
    DepartmentDBState &
    typeof actions.actionCreators;

const DepartmentDBList: React.SFC<Props> = ({ departmentDBs, selectDeptDB, requestDepartmentDBs }) => {

    return (
        <Layout>
            <Header>
                <h2 style={{ color: 'white', margin: '8px 0' }}>
                    DEPARTMENT DATABASES
                </h2>
            </Header>
            <Content>
                <Input placeholder="...search name" onChange={(e) => requestDepartmentDBs(e.currentTarget.value)} />
                <Staggered>
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
                </Staggered>
            </Content>
        </Layout>
    );
};

export default DepartmentDBList;