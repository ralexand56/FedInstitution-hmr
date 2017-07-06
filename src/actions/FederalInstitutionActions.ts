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
                        getState().institutions.activeInstitutions[i].CustomID);
                });
            }

            // updateModifiedDate(deptDBID);
        },
};