import {
    baseUrl,
    DepartmentDB,
    DepositInstitution,
    FedInstitutionFilter,
    Institution,
    InstitutionFilter,
    KnownAction,
} from './../services/data-types';

export const assignFedByDeptDB = (
    dispatch: (action: KnownAction) => void,
    deptDBID: number, rssDID: number, instID: string) => {
    let response: Promise<Response>;

    switch (deptDBID) {
        case 1:
            response = fetch(`${baseUrl}DepositInstitutions(${parseInt(instID, 10)})`);

            response.then(r => r.json()).then((institution: DepositInstitution) => {

                institution.BA_KEY_ID = rssDID;

                let rssInst = {
                    BA_KEY_ID: rssDID.toString()
                };

                fetch(`${baseUrl}DepositInstitutions(${institution.BA_ID})`, {
                    method: 'patch',
                    body: JSON.stringify(rssInst)
                });
            });
            break;

        case 3:
            let url = `${baseUrl}ConsumerInstitutions?$filter=BankID eq '${instID}'`;
            response = fetch(url);

            response.then(r => r.json()).then(x => {
                let institution = x.value[0];

                institution.RSSDID = rssDID;

                fetch(`${baseUrl}ConsumerInstitutions(${institution.InstitutionID})`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'patch',
                    body: `{RSSDID: ${rssDID}}`
                });
            });
            break;

        case 5:
            response = fetch(`${baseUrl}IndirectInstitutions(${parseInt(instID, 10)})`);

            response.then(r => r.json()).then(x => {
                let institution = x;

                institution.RSSDID = rssDID;

                fetch(`${baseUrl}IndirectInstitutions(${parseInt(instID, 10)})`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'patch',
                    body: `{RSSDID: ${rssDID}}`
                });
            });
            break;

        default:
            break;
    }

    dispatch({
        type: 'ASSIGN_FEDINSTITUTION',
    });
};

export const fetchFederalEntityTypes = (dispatch: (action: KnownAction) => void) => {
    fetch(`${baseUrl}FederalEntityTypes`)
        .then(response => response.json())
        .then(fedTypes => dispatch({
            type: 'RECEIVE_FEDINSTITUTIONTYPES',
            fedInstitutionTypes: fedTypes.value
        }));
};

export const fetchFederalInstitutions =
    (dispatch: (action: KnownAction) => void, searchOptions: FedInstitutionFilter) => {
        dispatch({ type: 'REQUEST_FEDINSTITUTIONS' });

        let selectedStates = searchOptions.selectedStates.filter(x => x !== '');
        let selectedTypes = searchOptions.selectedTypes.filter(x => x !== '');

        if (
            (searchOptions.searchTxt === undefined || searchOptions.searchTxt.toString().trim() === '')
            && (searchOptions.RSSDID === undefined || searchOptions.RSSDID!.toString().trim() === '')
            && (selectedStates.length === 0)
            && (selectedTypes.length === 0)) {
            dispatch({
                type: 'RECEIVE_FEDINSTITUTIONS',
                fedInstitutions: [],
            });

            return;
        }

        let searchStr = (searchOptions.RSSDID === undefined
            || searchOptions.RSSDID.toString().trim() === '')
            ? `${baseUrl}FederalInstitutions?$filter=IsActive%20eq%20true`
            : `${baseUrl}FederalInstitutions?$filter=RSSDID eq ${searchOptions.RSSDID}`;

        if (searchOptions.RSSDID === undefined ||
            searchOptions.RSSDID.toString().trim() === '') {
            // searchStr += `&$expand=Institutions,FederalEntityType,HoldingCompany`;
            let nameSearch = encodeURIComponent(searchOptions.searchTxt);

            searchStr += ` and IsHCCode ne 1`;

            if (searchOptions.searchBankingTypes) {
                searchStr += ` and (FederalEntityTypeCode eq 'NMB' 
                      or FederalEntityTypeCode eq 'CPB' 
                      or FederalEntityTypeCode eq 'FBK' 
                      or FederalEntityTypeCode eq 'SMB' 
                      or FederalEntityTypeCode eq 'SSB' 
                      or FederalEntityTypeCode eq 'NAT' 
                      or FederalEntityTypeCode eq 'AGB')`;
            }

            if (selectedStates.length) {
                let statesTxt = selectedStates.map(x => `StateCode eq '${x}'`).join(' or ');
                searchStr += ` and (${statesTxt})`;
            }

            if (selectedTypes.length) {
                let fedTypesTxt = selectedTypes.map(x => `FederalEntityTypeCode eq '${x}'`).join(' or ');
                searchStr += ` and (${fedTypesTxt})`;
            }

            if (searchOptions.isStartsWith) {
                let searchHoldingTxt = searchOptions.searchHoldingCompanies ?
                    `or startswith(HoldingCompany/FullName, '${nameSearch}')` : '';

                searchStr += ` and (startswith(FullName, '${nameSearch}') ${searchHoldingTxt})`;
            } else {
                let searchHoldingTxt = searchOptions.searchHoldingCompanies ?
                    `or contains(HoldingCompany/FullName, '${nameSearch}')` : '';

                searchStr += ` and (contains(FullName, '${nameSearch}') ${searchHoldingTxt})`;
            }

            searchStr += `&$expand=Institutions,FederalEntityType,HoldingCompany&$orderby=FullName,StateCode`;
        }
        // console.dir(searchStr);

        // debugger;
        fetch(searchStr)
            .then(response => response.json())
            .then(fedInsts => {

                dispatch({
                    type: 'RECEIVE_FEDINSTITUTIONS',
                    fedInstitutions: fedInsts.value,
                });
            });
    };

export const fetchInstitutions =
    (dispatch: (action: KnownAction) => void, instFilter: InstitutionFilter) => {
        let selectedStates = instFilter.selectedStates.filter(selState => selState !== '');
        let selectedTypes = instFilter.selectedTypes.filter(selType => selType !== 0);

        dispatch({ type: 'REQUEST_INSTITUTIONS' });

        let reqTxt = `${baseUrl}Institutions?$filter=DeptDBID eq ${instFilter.deptDBID}`;

        switch (instFilter.selectedAssignmentFilter) {
            case 'Unassigned': {
                reqTxt += ` and RSSDID eq null`;
                break;
            }

            case 'Assigned': {
                reqTxt += ` and RSSDID ne null`;
                break;
            }

            default: {
                break;
            }
        }

        if (instFilter.searchTxt) {
            let encodedTxt = encodeURIComponent(instFilter.searchTxt);

            reqTxt += ` and ${instFilter.isStartsWith ? 'startswith' : 'contains'}(Name, '${encodedTxt}')`;
        }

        if (selectedStates !== null
            && selectedStates.length
            && Array.isArray(selectedStates)) {
            let statesTxt = selectedStates.map(x => `StateCode eq '${x}'`).join(' or ');
            reqTxt += ` and (${statesTxt})`;
        }

        if (selectedTypes !== null
            && selectedTypes.length
            && Array.isArray(instFilter.selectedTypes)) {
            let typesTxt = selectedTypes.map(x => `InstitutionTypeID eq ${x}`).join(' or ');
            reqTxt += ` and (${typesTxt})`;
        }

        reqTxt += `&$expand=FederalInstitution,InstitutionType&$orderby=Name,StateCode&$count=true`;
        // console.dir(reqTxt);
        fetch(reqTxt)
            .then(response => response.json())
            .then(insts => {
                let institutions: Array<Institution> = insts.value;

                institutions.forEach((i: Institution) => {
                    i.IsSelected = false;
                });

                dispatch({
                    type: 'RECEIVE_INSTITUTIONS',
                    activeInstitutions: institutions,
                    cnt: insts['@odata.count'],
                });
            }
            );
    };

export const fetchInstitutionTypes = (dispatch: (action: KnownAction) => void) => {
    fetch(`${baseUrl}InstitutionTypes`)
        .then(response => response.json())
        .then(instTypes => dispatch({ type: 'RECEIVE_INSTITUTIONTYPES', instTypes: instTypes.value }));
};

export const fetchStates = (dispatch: (action: KnownAction) => void) => {
    fetch(`${baseUrl}States`)
        .then(response => response.json())
        .then(states => dispatch({ type: 'RECEIVE_STATES', states: states.value }));
};

export const fetchDepartmentDBs =
    (dispatch: (action: KnownAction) => void, searchTxt: string) => {
        let nameFilter = `$filter=startswith(Name, '${searchTxt}')&`;
        let reqTxt = `${baseUrl}DepartmentDBs?${searchTxt && nameFilter}$expand=Department,Institutions`;

        fetch(reqTxt)
            .then(response => response.json())
            .then(depts => {
                let deptsArr: DepartmentDB[] = depts.value;

                deptsArr.forEach((d: DepartmentDB) => {
                    d.Pct = d.Institutions.length === 0 ? 0 :
                        (d.Institutions.filter(x => x.RSSDID).length / d.Institutions.length);
                });

                let activeDeptDB = depts.value[0];

                dispatch({ type: 'RECEIVE_DEPARTMENTDBS', searchTxt: searchTxt, departmentDBs: depts.value });
                dispatch({ type: 'SELECT_DEPTDB', activeDeptDB });
            });
    };

export const updateModifiedDate = (dbid: number) => {
    return fetch(`DepartmentDBs(${dbid})`, {
        method: 'patch',
        body: JSON.stringify({ LastModified: new Date() })
    });
};