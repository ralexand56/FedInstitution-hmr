import { AppThunkAction, ApplicationState } from '../store';
import {
    FedInstitutionFilter,
    KnownAction,
    InstitutionFilter,
} from './../services/data-types';
import {
    fetchFederalInstitutions,
    fetchInstitutions,
} from './FetchActions';

export const actionCreators = {
    setInstitutionFilter: (instFilter: InstitutionFilter):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            fetchInstitutions(dispatch, instFilter);

            dispatch({ type: 'SET_INSTITUTION_FILTER', institutionFilter: instFilter });
        },

    setFedInstitutionFilter: (fedInstitutionFilter: FedInstitutionFilter):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            fetchFederalInstitutions(dispatch, fedInstitutionFilter);

            dispatch({ type: 'SET_FEDINSTITUTION_FILTER', fedInstitutionFilter: fedInstitutionFilter });
        },

    selectAll: () => {
        return ({
            type: 'SELECT_ALL'
        });
    },

    selectNone: () => {
        return ({
            type: 'SELECT_NONE'
        });
    },

    updateInstitutionSelection: (indices: number[]) => {
        return {
            type: 'UPDATE_INSTITUTION_SELECTION', indices: indices
        };
    },
};