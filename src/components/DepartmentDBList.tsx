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
                departmentDBs.map(d => <Card
                    key={d.DeptDBID}
                    style={{ width: 300 }}
                    title={d.Name}
                    loading={true}
                    content={ <button onClick={() => selectDeptDB(d)} >Load</button>}
                >
                   
                </Card>)}
        </div>
    );
};

export default DepartmentDBList;