import * as React from 'react';
import {DepartmentDB} from '../services/data-types';

interface AppProps {
    departmentDBs: DepartmentDB[];
    selectDeptDB: (deptDBID: number) => void;
}

export const DepartmentDBList = (props: AppProps) => {
    return (
        props.departmentDBs.map(d => <div>{d.Name}</div>)
    );
};