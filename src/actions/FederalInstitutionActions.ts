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

    assignFed: (fedInst: FederalInstitution, deptDBID: number, instIDs: number[] | string):
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            let rssDID = fedInst.RSSDID;

            // console.dir(fedInst);
            if (typeof (instIDs) !== 'string') {
                instIDs.forEach(i => {
                    assignFedByDeptDB(
                        dispatch,
                        deptDBID,
                        rssDID,
                        getState().institutionSlice.activeInstitutions[i].CustomID);
                });
            }

            // updateModifiedDate(deptDBID);
        },
};