import React from 'react';
import {
    Institution,
    InstitutionState,
} from '../services/data-types';
import {
    Table,
    Tooltip,
} from 'antd';
import * as actions from '../actions/InstitutionActions';
import styled from 'styled-components';
import InstitutionSearchHeaderContainer from './InstitutionSearchHeaderContainer';

const MainContainer = styled.div`
    flex: 1;
    height: 100%;
    border: 0px solid black;
    overflow: auto;
    margin-top: 40px;
`;

type Props = InstitutionState &
    typeof actions.actionCreators;

const columns = [
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

export const Institutions = ({
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
            <InstitutionSearchHeaderContainer />
            <Table
                pagination={{ pageSize: 50, total: activeInstitutions.length }}
                columns={columns}
                dataSource={activeInstitutions}
                rowKey={'CustomID'}
                size="small"
                rowSelection={rowSelection}
            />
        </MainContainer>
    );
};

export default Institutions;