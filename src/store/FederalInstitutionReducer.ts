import { Reducer } from 'redux';
import {
    FederalInstitutionState,
    KnownAction,
} from './../services/data-types';

const unloadedState: FederalInstitutionState = {
    fedInstitutions: [],
    fedInstitutionsCnt: 0,
    fedInstitutionFilter: {
        RSSDID: undefined,
        searchTxt: '',
        isStartsWith: true,
        searchBankingTypes: false,
        searchHoldingCompanies: false,
        selectedStates: [''],
        selectedTypes: [''],
    },
    fedInstitutionsLoading: false,
    fedInstitutionTypes: [],
    states: [],
};

export const reducer: Reducer<FederalInstitutionState> = (state: FederalInstitutionState, action: KnownAction) => {
    switch (action.type) {

        case 'ASSIGN_FEDINSTITUTION':

            return {
                ...state,
            };
            
        case 'RECEIVE_FEDINSTITUTIONS':

            return {
                ...state,
                fedInstitutions: action.fedInstitutions,
                fedInstitutionsLoading: false,
            };

        case 'RECEIVE_FEDINSTITUTIONTYPES':

            return {
                ...state,
                fedInstitutionTypes: action.fedInstitutionTypes,
            };

        case 'RECEIVE_STATES':

            return {
                ...state,
                states: action.states,
            };

        case 'REQUEST_FEDINSTITUTIONS':

            return {
                ...state,
                fedInstitutions: [],
                fedInstitutionsLoading: true,
            };

        case 'SET_FEDINSTITUTION_FILTER':

            return {
                ...state,
                fedInstitutionFilter: action.fedInstitutionFilter,
            };

        default:
            return state || unloadedState;
    }
};