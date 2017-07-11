import * as React from 'react';
import {
    DepartmentDB,
    Institution,
    InstitutionFilter
} from '../services/data-types';
import {
    Layout,
    Select,
    Table,
    Input,
} from 'antd';

const Option = Select.Option;
const Header = Layout.Header;
const Content = Layout.Content;

interface Props {
    activeDeptDB: DepartmentDB;
    activeInstitutions: Institution[];
    assignmentOptions: string[];
    institutionFilter: InstitutionFilter;
    selectedInstitutionIDs: number[];
    setInstitutionFilter: (instFilter: InstitutionFilter) => {};
    updateInstitutionSelection: (ids: number[]) => {};
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
    },
    {
        title: 'State',
        dataIndex: 'StateCode',
        key: 'StateCode',
    },
    {
        title: 'Region',
        dataIndex: 'Region',
        key: 'Region',
    },
    {
        title: 'Type',
        dataIndex: 'InstitutionType.Name',
        key: 'InstitutionTypeID',
    },
    {
        title: 'Fed. Inst.',
        dataIndex: 'FederalInstitution.Name',
        key: 'FederalInstitution',
    },
    {
        title: 'RSSDID',
        dataIndex: 'RSSDID',
        key: 'RSSDID',
    },
    {
        title: 'ID',
        dataIndex: 'CustomID',
        key: 'CustomID',
    },
];

export const InstitutionList: React.SFC<Props> =
    ({
        activeDeptDB,
        activeInstitutions,
        assignmentOptions,
        institutionFilter,
        setInstitutionFilter,
        selectedInstitutionIDs,
        updateInstitutionSelection,
     }) => {

        let rowSelection = {
            selectedRowKeys: selectedInstitutionIDs,
            onChange: (keys: number[]) => updateInstitutionSelection(keys),
        };

        return (
            <Layout>
                <Header
                    style={
                        { color: 'white', padding: 0, display: 'flex', alignItems: 'center' } as React.CSSProperties}
                >
                    <h2 style={{ color: 'white', margin: '0 10px', textTransform: 'uppercase' } as React.CSSProperties}>
                        {activeDeptDB.Name}
                        <small> | {activeDeptDB.Department.Name}
                        </small>
                    </h2>
                    <Input
                        placeholder="...search name"
                        onChange={(e) =>
                            setInstitutionFilter({ ...institutionFilter, searchTxt: e.currentTarget.value })}
                        style={{ width: 200, margin: '0 8px' }}
                    />
                    <Select
                        placeholder="select assignment"
                        defaultValue={institutionFilter.selectedAssignmentFilter}
                        onChange={(selVal: string) =>
                            handleAssignmentChanged(selVal, institutionFilter, setInstitutionFilter)}
                    >
                        {assignmentOptions.map(o => <Option key={o}>{o}</Option>)}
                    </Select>
                </Header>
                <Content>
                    <Table
                        columns={columns}
                        dataSource={activeInstitutions}
                        rowKey={'InstitutionID'}
                        rowSelection={rowSelection}
                    />
                </Content>
            </Layout >
        );
    };

const handleAssignmentChanged = (
    selVal: string,
    institutionFilter: InstitutionFilter, setInstitutionFilter: (instFilter: InstitutionFilter) => {}) => {
    setInstitutionFilter({ ...institutionFilter, selectedAssignmentFilter: selVal });
};

export default InstitutionList;