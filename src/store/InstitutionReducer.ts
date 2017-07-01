import { InstitutionDBState } from './../services/data-types';
import { KnownAction } from './../services/data-types';
import { Reducer } from 'redux';

const unloadedState: InstitutionDBState = {
    activeDeptDB: null,
    activeInstitutions: [],
    institutionsLoading: false,
    institutionFilter: {
        deptDBID: 1,
        searchTxt: 'k',
        isStartsWith: true,
        RSSDID: null,
        selectedAssignmentFilter: 2,
        selectedStates: [''],
        selectedTypes: [0],
    },
    institutionTotalCnt: 0,
    institutionTypes: [],
    selectedInstitutionIndices: [],
    states: [],
};

export const reducer: Reducer<InstitutionDBState> = (state: InstitutionDBState, action: KnownAction) => {
    switch (action.type) {

        case 'SET_INSTITUTION_FILTER':

            return {
                ...state,
                institutionFilter: action.institutionFilter,
            };

        case 'REQUEST_INSTITUTIONS':

            return {
                ...state,
                activeInstitutions: [],
                institutionsLoading: true,
                institutionTotalCnt: 0,
            };

        case 'RECEIVE_INSTITUTIONS':

            return {
                ...state,
                activeInstitutions: action.activeInstitutions,
                institutionTotalCnt: action.cnt,
                institutionsLoading: false,
            };

        case 'SELECT_ALL':

            return {
                ...state,
                selectedInstitutionIndices: state.activeInstitutions.map((x, ind) => ind),
            };

        case 'SELECT_NONE':

            return {
                ...state,
                selectedInstitutionIndices: [],
            };

        case 'SELECT_DEPTDB':

            return {
                ...state,
                activeDeptDB: action.activeDeptDB,
                institutionFilter: {
                    ...unloadedState.institutionFilter, deptDBID: action.activeDeptDB.DeptDBID,
                }
            };

        case 'UPDATE_INSTITUTION_SELECTION':

            return {
                ...state,
                selectedInstitutionIndices: action.indices,
            };

        default:
            return state || unloadedState;
    }
};