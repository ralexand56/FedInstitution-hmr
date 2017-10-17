import { AppThunkAction, ApplicationState } from '../store';
import {
    FederalInstitution,
    FedInstitutionFilter,
    KnownAction,
} from './../services/data-types';
import {
    assignFedByDeptDB,
    fetchFederalInstitutions,
} from './FetchActions';

export const actionCreators = {
    updateFedInstitutionFilter: (fedInstitutionFilter: FedInstitutionFilter):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            dispatch({ type: 'SET_FEDINSTITUTION_FILTER', fedInstitutionFilter: fedInstitutionFilter });
        },

    setFedInstitutionFilter: (fedInstitutionFilter: FedInstitutionFilter):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            fetchFederalInstitutions(dispatch, fedInstitutionFilter);

            dispatch({ type: 'SET_FEDINSTITUTION_FILTER', fedInstitutionFilter: fedInstitutionFilter });
        },

    assignFed: (fedInst: FederalInstitution):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            dispatch({
                type: 'ASSIGN_FEDINSTITUTION',
                fedInst,
            });

            const rssDID = fedInst.RSSDID;
            const instIDs = getState().institutionSlice.selectedCustomIDs;
            const activeDBID = getState().departmentDBSlice.activeDeptDB!.DeptDBID;
            // console.dir(fedInst);
            // if (typeof (instIDs) !== 'string') {
            instIDs.forEach(i => {

                assignFedByDeptDB(
                    dispatch,
                    activeDBID,
                    rssDID,
                    i);
            });

            // updateModifiedDate(deptDBID);
        },
};