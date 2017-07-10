import * as React from 'react';
import {
    DepartmentDB,
    Institution,
    InstitutionFilter
} from '../services/data-types';
import {
    Table,
    Input,
} from 'antd';

interface Props {
    activeDeptDB: DepartmentDB;
    activeInstitutions: Institution[];
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
        title: 'Type',
        dataIndex: 'InstitutionType.Name',
        key: 'InstitutionTypeID',
    },
    {
        title: 'ID',
        dataIndex: 'InstitutionID',
        key: 'InstitutionID',
    },
];

export const InstitutionList: React.SFC<Props> =
    ({
        activeDeptDB,
        activeInstitutions,
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
            <div>
                <h1 style={{ backgroundColor: '#A4C2DC', color: 'white', padding: 10 }}>{activeDeptDB.Name}
                    <small style={{ color: 'white' }}> |
                    {activeDeptDB.Department.Name}
                    </small>
                    {
                        (selectedInstitutionIDs.length > 0 &&
                            (<span> SELECTED | {selectedInstitutionIDs.length}</span>))
                    }
                </h1>
                <Input
                    placeholder="...search name"
                    onChange={(e) => setInstitutionFilter({ ...institutionFilter, searchTxt: e.currentTarget.value })}
                />
                <Table
                    columns={columns}
                    dataSource={activeInstitutions}
                    rowKey={'InstitutionID'}
                    rowSelection={rowSelection}
                />
            </div>
        );
    };

export default InstitutionList;