import { InstitutionState } from './../services/data-types';
import { KnownAction } from './../services/data-types';
import { Reducer } from 'redux';

const unloadedState: InstitutionState = {
    activeDeptDB: null,
    activeInstitutions: [],
    assignmentOptions: ['All', 'Assigned', 'Unassigned'],
    institutionsLoading: false,
    institutionFilter: {
        deptDBID: 1,
        searchTxt: '',
        isStartsWith: true,
        RSSDID: null,
        selectedAssignmentFilter: 'All',
        selectedStates: [''],
        selectedTypes: [0],
    },
    institutionTotalCnt: 0,
    institutionTypes: [],
    selectedInstitutionIDs: [],
    states: [],
};

export const reducer: Reducer<InstitutionState> = (state: InstitutionState, action: KnownAction) => {
    switch (action.type) {

        case 'RECEIVE_INSTITUTIONS':

            return {
                ...state,
                activeInstitutions: action.activeInstitutions,
                institutionTotalCnt: action.cnt,
                institutionsLoading: false,
            };

        case 'RECEIVE_INSTITUTIONTYPES':

            return {
                ...state,
                institutionTypes: action.instTypes,
            };

        case 'RECEIVE_STATES':

            return {
                ...state,
                states: action.states,
            };

        case 'REQUEST_INSTITUTIONS':

            return {
                ...state,
                activeInstitutions: [],
                institutionsLoading: true,
                institutionTotalCnt: 0,
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
                    ...unloadedState.institutionFilter, 
                    deptDBID: action.activeDeptDB ? action.activeDeptDB.DeptDBID : null,
                },
                activeInstitutions: [],
            };

        case 'SET_INSTITUTION_FILTER':

            return {
                ...state,
                institutionFilter: action.institutionFilter,
            };

        case 'UPDATE_INSTITUTION_SELECTION':

            return {
                ...state,
                selectedInstitutionIDs: action.indices,
            };

        default:
            return state || unloadedState;
    }
};