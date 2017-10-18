import React from 'react';
import {
    Institution,
    InstitutionState,
    InstitutionFilter,
    State,
} from '../services/data-types';
import {
    Button,
    Layout,
    Select,
    Table,
    Input,
    Tooltip,
} from 'antd';
import * as actions from '../actions/InstitutionActions';
import styled from 'styled-components';

const Option = Select.Option;
const Header = Layout.Header;
const Content = Layout.Content;
const Search = Input.Search;

const MainContainer = styled.div`
    flex: 1;
`;

type Props = InstitutionState &
    typeof actions.actionCreators;

const columns = [
    // {
    //     title: 'Unassign',
    //     key: 'unassign',
    //     render: (txt: string, row: Institution) => (row.RSSDID && <Icon onClick={} type="unlock" />)
    // },
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        render: (txt: string, inst: Institution) => (
            <span style={inst.RSSDID ? { color: 'green' } : { color: 'red' }}>
                {txt}
            </span>
        )
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
        render: (txt: string) => (
            <span>
                <Tooltip placement="topLeft" title={txt}>
                    {txt.substr(0, 50)}
                </Tooltip>
            </span>
        )
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

export const InstitutionList = ({
        activeDeptDB,
        activeInstitutions,
        assignmentOptions,
        institutionFilter,
        setInstitutionFilter,
        selectedCustomIDs,
        states,
        unassignFed,
        updateInstitutionFilter,
        updateInstitutionSelection,
     }: Props): JSX.Element => {

        let rowSelection = {
            selectedRowKeys: selectedCustomIDs,
            onChange: (keys: string[]) => updateInstitutionSelection(keys),
        };

        return (
            <MainContainer>
                <Layout>
                    <Header
                        style={
                            {
                                color: 'white',
                                padding: 10,
                                display: 'flex',
                                alignItems: 'center'
                            } as React.CSSProperties}
                    >
                        <h2 style={{ color: 'white', textTransform: 'uppercase' } as React.CSSProperties}>
                            {activeDeptDB && activeDeptDB.Name}
                            <small> | {activeDeptDB && activeDeptDB.Department.Name}
                            </small>
                        </h2>
                        <Search
                            placeholder="...search name"
                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                updateInstitutionFilter({
                                    ...institutionFilter, searchTxt: e.currentTarget.value
                                })
                            }
                            onSearch={(value: string) =>
                                setInstitutionFilter({ ...institutionFilter, searchTxt: value })}
                            style={{ width: 200, margin: '0 10px' }}
                        />
                        <span>
                            <Select
                                placeholder="select assignment"
                                defaultValue={institutionFilter.selectedAssignmentFilter}
                                onChange={(selVal: string) =>
                                    handleAssignmentChanged(selVal, institutionFilter, setInstitutionFilter)}
                            >
                                {assignmentOptions.map(o => <Option key={o}>{o}</Option>)}
                            </Select>
                        </span>
                        <Select
                            mode="multiple"
                            placeholder="select state"
                            onChange={
                                (val: string[]) =>
                                    handleSelectedStateChanged(val, institutionFilter, setInstitutionFilter)
                            }
                            style={{ width: 200, margin: '0 10px' }}
                        >
                            {states && renderStates(states)}
                        </Select>
                        <span style={{ margin: '0 10px' }}>
                            Count | {activeInstitutions.length}
                        </span>
                        <span style={{ margin: '0 10px' }}>
                            Selected | {selectedCustomIDs.length}
                        </span>
                        <span style={{ margin: '0 10px' }}>
                            <Tooltip title="Unassign selected Institutions" >
                                <Button
                                    disabled={selectedCustomIDs.length === 0}
                                    type="primary"
                                    icon="unlock"
                                    onClick={unassignFed}
                                />
                            </Tooltip>
                        </span>
                    </Header>
                    <Content>
                        <Table
                            columns={columns}
                            dataSource={activeInstitutions}
                            rowKey={'CustomID'}
                            size="small"
                            rowSelection={rowSelection}
                        />
                    </Content>
                </Layout >
            </MainContainer>
        );
    };

const handleAssignmentChanged = (
    selVal: string,
    institutionFilter: InstitutionFilter, setInstitutionFilter: (instFilter: InstitutionFilter) => {}) => {
    setInstitutionFilter({ ...institutionFilter, selectedAssignmentFilter: selVal });
};

const handleSelectedStateChanged =
    (
        value: string[],
        instFilter: InstitutionFilter,
        setInstitutionFilter: (f: InstitutionFilter) => {}, ) => {
        setInstitutionFilter({ ...instFilter, selectedStates: value });
    };

const renderStates = (states: State[]) => {
    return (
        states.map(st =>
            <Option key={st.StateCode}>{st.StateCode}</Option>
        )
    );
};

export default InstitutionList;