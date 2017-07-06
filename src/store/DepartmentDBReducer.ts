import { Reducer } from 'redux';
import {
    DepartmentDBState,
    KnownAction,
} from './../services/data-types';

const unloadedState: DepartmentDBState = {
    activeDeptDB: null,
    departmentDBs: [],
    deptDBsLoading: false,
    searchTxt: '',
    showDeptDBs: true,
};

export const reducer: Reducer<DepartmentDBState> = (state: DepartmentDBState, action: KnownAction) => {
    switch (action.type) {

        case 'RECEIVE_DEPARTMENTDBS':

            return {
                ...state,
                departmentDBs: action.departmentDBs,
                deptDBsLoading: false,
            };

        case 'REQUEST_DEPARTMENTDBS':

            return {
                ...state,
                departmentDBs: [],
                deptDBsLoading: true,
            };

        case 'SELECT_DEPTDB':

            return {
                ...state,
                activeDeptDB: action.activeDeptDB,
            };

        case 'TOGGLE_DEPARTMENT_VISIBILITY':

            return {
                ...state,
                showDeptDBs: !state.showDeptDBs,
            };

        default:
            return state || unloadedState;
    }
};