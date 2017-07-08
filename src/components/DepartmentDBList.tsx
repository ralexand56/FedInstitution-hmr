import * as React from 'react';
import { DepartmentDB } from '../services/data-types';
import { Card } from 'antd';

interface Props {
    departmentDBs: DepartmentDB[];
    selectDeptDB: (db: DepartmentDB) => {};
}

const DepartmentDBList: React.SFC<Props> = ({ departmentDBs, selectDeptDB }) => {

    return (
        <div>
            {
                departmentDBs.map(d =>
                    <div
                        key={d.DeptDBID}
                        onClick={() => selectDeptDB(d)}
                    >
                        <Card
                            bordered={true}
                            style={{ width: 300, marginBottom: 20}}
                            title={d.Name}
                            loading={true}
                        />
                    </div>)}
        </div>
    );
};

export default DepartmentDBList;