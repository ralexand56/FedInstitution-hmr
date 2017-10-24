import React from 'react';
import styled from 'styled-components';
import {
    InstitutionFilter,
    State,
} from '../services/data-types';
import {
    Button,
    Icon,
    Input,
    Select,
    Tooltip,
} from 'antd';
import {
    InstitutionState,
} from '../services/data-types';
import * as actions from '../actions/InstitutionActions';

const Search = Input.Search;
const Option = Select.Option;

type Props = InstitutionState &
    typeof actions.actionCreators;

const MainContainer = styled.div`
    display: flex;
    align-items: flex-end;
    background: brown;
    padding: 10px;
    color: white;
    font-weight: normal;
    box-shadow: 0px 0px 2px black;
    margin-bottom: 3px;
    > h3 {
        color: white
    }
`;

const InstitutionSearchHeader = (
    {
        activeInstitutions,
        activeDeptDB,
        assignmentOptions,
        institutionFilter,
        selectedCustomIDs,
        setInstitutionFilter,
        states,
        unassignFed,
        updateInstitutionFilter,
}: Props) => {
    return (
        <MainContainer>
            <h3>
                <Icon type="home" style={{margin: 5}} /> 
                {activeDeptDB && activeDeptDB.Name}
                <small> | {activeDeptDB && activeDeptDB.Department.Name}
                </small>
            </h3>
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
                style={{ width: 100, margin: '0 10px' }}
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
                <Tooltip title="Unassign Selected Institutions" >
                    <Button
                        disabled={selectedCustomIDs.length === 0}
                        type="primary"
                        icon="unlock"
                        onClick={unassignFed}
                    />
                </Tooltip>
            </span>
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

export default InstitutionSearchHeader;