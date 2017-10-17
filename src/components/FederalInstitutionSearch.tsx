import React from 'react';
import styled from 'styled-components';
import {
    Input,
    Switch,
} from 'antd';
import * as actions from '../actions/FederalInstitutionActions';
import {
    FederalInstitution,
    FedInstitutionFilter,
} from '../services/data-types';

const Search = Input.Search;

const MainContainer = styled.div`
    display: flex;
    align-items: flex-end;
    background: brown;
    padding: 10px;
    color: white;
    font-family: Arial;
    font-weight: normal;
    font-size: 1.1em;
    box-shadow: 0px 1px 1px #666;
`;

interface Props {
    fedInstitutions: FederalInstitution[];
    fedInstitutionFilter: FedInstitutionFilter;
    setFedInstitutionFilter: typeof actions.actionCreators.setFedInstitutionFilter;
    updateFedInstitutionFilter: typeof actions.actionCreators.updateFedInstitutionFilter;
}

const FederalInstitutionSearch = (
    {
        fedInstitutions,
        fedInstitutionFilter,
        updateFedInstitutionFilter,
        setFedInstitutionFilter }: Props) => {
    return (
        <MainContainer>
            <h2 style={{ color: 'white' }}>Federal Institutions</h2>
            <span
                style={{ margin: '0 10px' }}
            >
                <Search
                    style={{ width: 200, }}
                    placeholder="...search name"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        updateFedInstitutionFilter({
                            ...fedInstitutionFilter, searchTxt: e.currentTarget.value
                        })
                    }
                    onSearch={
                        (value: string) =>
                            setFedInstitutionFilter({ ...fedInstitutionFilter, searchTxt: value.trim() })}
                />
                <span style={{ margin: '0 10px' }}>
                    {fedInstitutionFilter.isStartsWith ? 'starts with' : 'contains'}
                </span>
                <Switch
                    checked={fedInstitutionFilter.isStartsWith}
                    onChange={
                        (e) => setFedInstitutionFilter({ ...fedInstitutionFilter, isStartsWith: e })}
                />
            </span>
            <span>...search holding company name
                <Switch
                    checked={fedInstitutionFilter.searchHoldingCompanies}
                    onChange={
                        (e) => setFedInstitutionFilter({ ...fedInstitutionFilter, searchHoldingCompanies: e })}
                />
            </span>
            <Search
                style={{ width: 100 }}
                placeholder="...search RSSDID"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    updateFedInstitutionFilter({
                        ...fedInstitutionFilter, RSSDID: parseInt(e.currentTarget.value, 10) || undefined
                    })
                }
                onSearch={(value: string) =>
                    setFedInstitutionFilter({
                        ...fedInstitutionFilter, RSSDID: parseInt(value.trim(), 10) || undefined
                    })}
            />
            <span style={{ margin: '0 10px' }}>
                Count | {fedInstitutions.length}
            </span>
        </MainContainer>
    );
};

export default FederalInstitutionSearch;