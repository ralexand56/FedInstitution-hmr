import React from 'react';
import {DepartmentDB} from '../services/data-types';

interface Props {
    departmentDBs: DepartmentDB[];
    selectDeptDB: (deptDBID: number) => void;
}

export const DepartmentDBList = ({departmentDBs}: Props) => {
    return (
        departmentDBs.map(d => <div>{d.Name}</div>)
    );
};

export default DepartmentDBList;