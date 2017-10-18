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
    selectedCustomIDs: [],
    states: [],
};

export const reducer: Reducer<InstitutionState> = (state: InstitutionState, action: KnownAction) => {
    switch (action.type) {
        case 'ASSIGN_FEDINSTITUTION':
            const fedInst = action.fedInst;
            const customIDs = state.selectedCustomIDs;
            const activeInsts = state.activeInstitutions.slice();

            customIDs.map(x => {
                const i = activeInsts.filter(y => y.CustomID === x)[0];

                i.RSSDID = fedInst.RSSDID;
                i.FederalInstitution = fedInst;
            });

            return {
                ...state,
                activeInstitutions: activeInsts,
            };

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
                selectedCustomIDs: [],
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

        case 'UNASSIGN_FEDINSTITUTION':
            const selectedCustomIDs = state.selectedCustomIDs;
            const activeInstsU = state.activeInstitutions.slice();

            selectedCustomIDs.map(x => {
                const i = activeInstsU.filter(y => y.CustomID === x)[0];

                i.RSSDID = undefined;
                i.FederalInstitution = undefined;
            });

            return {
                ...state,
                activeInstitutions: activeInstsU,
            };

        case 'UPDATE_INSTITUTION_SELECTION':

            return {
                ...state,
                selectedCustomIDs: action.indices,
            };

        default:
            return state || unloadedState;
    }
};