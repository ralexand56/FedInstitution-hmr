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
            <div><h1 style={{ color: activeDeptDB.Color }}>{activeDeptDB.Name}
                <small style={{ color: activeDeptDB.Department.Color }}>
                    |{activeDeptDB.Department.Name}
                </small>
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