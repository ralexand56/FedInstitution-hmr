import { AppThunkAction, ApplicationState } from '../store';
import {
    FedInstitutionFilter,
    KnownAction,
    InstitutionFilter,
} from './../services/data-types';
import {
    fetchFederalInstitutions,
    fetchInstitutions,
    unassignFed,
} from './FetchActions';

export const actionCreators = {
    updateInstitutionFilter: (instFilter: InstitutionFilter):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {

            dispatch({ type: 'SET_INSTITUTION_FILTER', institutionFilter: instFilter });
        },

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

    unassignFed: ():
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            dispatch({
                type: 'UNASSIGN_FEDINSTITUTION',
            });

            const instIDs = getState().institutionSlice.selectedCustomIDs;
            const activeDBID = getState().departmentDBSlice.activeDeptDB!.DeptDBID;

            instIDs.forEach(i => {

                unassignFed(
                    dispatch,
                    activeDBID,
                    i);
            });
            // console.dir(fedInst);
            // if (typeof (instIDs) !== 'string') {
            // updateModifiedDate(deptDBID);
        },

    updateInstitutionSelection: (indices: string[]) => {
        return {
            type: 'UPDATE_INSTITUTION_SELECTION', indices: indices
        };
    },
};