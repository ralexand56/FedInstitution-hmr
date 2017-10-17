import * as React from 'react';
import {
    InstitutionState,
    InstitutionFilter,
    State,
} from '../services/data-types';
import {
    Layout,
    Select,
    Table,
    Input,
    Tooltip,
} from 'antd';
import * as actions from '../actions/InstitutionActions';

const Option = Select.Option;
const Header = Layout.Header;
const Content = Layout.Content;
const Search = Input.Search;

type Props = InstitutionState &
    typeof actions.actionCreators;

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

export const InstitutionList =
    ({
        activeDeptDB,
        activeInstitutions,
        assignmentOptions,
        institutionFilter,
        setInstitutionFilter,
        selectedCustomIDs,
        states,
        updateInstitutionFilter,
        updateInstitutionSelection,
     }: Props) => {

        let rowSelection = {
            selectedRowKeys: selectedCustomIDs,
            onChange: (keys: string[]) => updateInstitutionSelection(keys),
        };

        return (
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
                            (val: string[]) => handleSelectedStateChanged(val, institutionFilter, setInstitutionFilter)
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