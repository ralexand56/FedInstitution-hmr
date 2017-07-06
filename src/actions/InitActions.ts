import { AppThunkAction, ApplicationState } from '../store';
import {
    KnownAction,
} from './../services/data-types';
import {
    fetchDepartmentDBs,
    fetchFederalEntityTypes,
    fetchInstitutionTypes,
    fetchStates,
} from './FetchActions';

export const actionCreators = {

    init: ():
        AppThunkAction<KnownAction> => (dispatch: (action: KnownAction) => void, getState: () => ApplicationState) => {
            fetchDepartmentDBs(dispatch, '');

            fetchStates(dispatch);

            fetchInstitutionTypes(dispatch);

            fetchFederalEntityTypes(dispatch);

            dispatch({ type: 'INIT', });
        },
};