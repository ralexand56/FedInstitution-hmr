import { AppThunkAction, ApplicationState } from '../store';
import {
    DepartmentDB,
    KnownAction,
} from './../services/data-types';
import {
    fetchDepartmentDBs,
} from './FetchActions';

// Action Creators

export const actionCreators = {

    requestDepartmentDBs: (searchTxt: string):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            fetchDepartmentDBs(dispatch, searchTxt);

            dispatch({ type: 'REQUEST_DEPARTMENTDBS', searchTxt: searchTxt});
        },

    selectDeptDB: (activeDeptDB: DepartmentDB) => ({ 
        type: 'SELECT_DEPTDB', 
        activeDeptDB, }),

    toggleDepartmentVisibility: () => ({
        type: 'TOGGLE_DEPARTMENT_VISIBILITY',
    }),
};