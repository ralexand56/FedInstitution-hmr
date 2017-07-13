import * as React from 'react';
import {
    FederalInstitutionState,
} from '../services/data-types';
import {
    Card,
    Layout,
    Input,
    Switch,
} from 'antd';
import * as actions from '../actions/FederalInstitutionActions';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

// const Option = Select.Option;
const Header = Layout.Header;
const Content = Layout.Content;
const Search = Input.Search;

const FederalInstitutionList = ({
    fedInstitutions,
    fedInstitutionFilter,
    setFedInstitutionFilter,
    updateFedInstitutionFilter,
 }: Props) => {
    return (
        <Layout style={{ height: 300 }}>
            <Header
                style={
                    {
                        alignItems: 'center',
                        color: 'white',
                        display: 'flex',
                        padding: 10,
                    }
                }
            >
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
                    style={{ width: 100, margin: 10 }}
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
            </Header>
            <Content style={{ overflowX: 'auto', whiteSpace: 'nowrap' } as React.CSSProperties}>
                {
                    fedInstitutions && fedInstitutions.map(f =>
                        <Card
                            key={f.RSSDID}
                            style={{ display: 'inline-block', margin: '10px 5px', width: 300, height: 200 }}
                            title={f.Name}
                        />
                    )
                }
            </Content>
        </Layout>
    );
};

export default FederalInstitutionList;