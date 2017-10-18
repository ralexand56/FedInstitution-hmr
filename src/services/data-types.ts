import { FederalInstitution, DepartmentDB, UnAssignFederalInstitutionAction } from './data-types';
// export const baseUrl = `https://dev.informars.com/webservices/FedSvc/odata/`;
// export const baseUrl = `http://localhost:58085/api/`;
export const baseUrl = `http://usca-itdev/webservices/fedapi/api/`;

export interface DepartmentDBState {
    activeDeptDB: DepartmentDB | null;
    departmentDBs: DepartmentDB[];
    deptDBsLoading: boolean;
    searchTxt: string;
    showDeptDBs: boolean;
}

export interface InstitutionState {
    activeDeptDB: DepartmentDB | null;
    activeInstitutions: Institution[];
    assignmentOptions: string[];
    institutionsLoading: boolean;
    institutionFilter: InstitutionFilter;
    institutionTotalCnt: number;
    institutionTypes: InstitutionType[];
    selectedCustomIDs: string[];
    states: Array<State>;
}

export interface FederalInstitutionState {
    fedInstitutions: FederalInstitution[];
    fedInstitutionsCnt: number;
    fedInstitutionFilter: FedInstitutionFilter;
    fedInstitutionTypes: FederalEntityType[];
    fedInstitutionsLoading: boolean;
    selectedCustomIDs: string[];
    states: Array<State>;
}

export type KnownAction =
    AssignFederalInstitutionAction |
    InitAction |
    ReceiveInstitutionTypesAction |
    ReceiveDepartmentDBsAction |
    ReceiveFedInstitutionsAction |
    ReceiveFedInstitutionTypesAction |
    ReceiveInstitutionsAction |
    ReceiveStatesAction |
    RequestDepartmentDBsAction |
    RequestFedInstitutionsAction |
    RequestInstitutionsAction |
    SetInstitutionFilter |
    SetFedInstitutionFilter |
    SelectAllAction |
    SelectDeptDBAction |
    SelectNoneAction |
    ToggleDepartmentVisiblityAction |
    UnAssignFederalInstitutionAction |
    UpdateInstitutionSelection;

export interface AssignFederalInstitutionAction {
    type: 'ASSIGN_FEDINSTITUTION';
    fedInst: FederalInstitution;
}

export interface InitAction {
    type: 'INIT';
}

export interface RequestDepartmentDBsAction {
    type: 'REQUEST_DEPARTMENTDBS';
    searchTxt: string;
}

export interface ReceiveDepartmentDBsAction {
    type: 'RECEIVE_DEPARTMENTDBS';
    searchTxt: string;
    departmentDBs: Array<DepartmentDB>;
}

export interface SetInstitutionFilter {
    type: 'SET_INSTITUTION_FILTER';
    institutionFilter: InstitutionFilter;
}

export interface SetFedInstitutionFilter {
    type: 'SET_FEDINSTITUTION_FILTER';
    fedInstitutionFilter: FedInstitutionFilter;
}

export interface SelectAllAction {
    type: 'SELECT_ALL';
}

export interface SelectNoneAction {
    type: 'SELECT_NONE';
}

export interface ToggleDepartmentVisiblityAction {
    type: 'TOGGLE_DEPARTMENT_VISIBILITY';
}

export interface ReceiveStatesAction {
    type: 'RECEIVE_STATES';
    states: Array<State>;
}

export interface ReceiveInstitutionTypesAction {
    type: 'RECEIVE_INSTITUTIONTYPES';
    instTypes: InstitutionType[];
}

export interface RequestFedInstitutionsAction {
    type: 'REQUEST_FEDINSTITUTIONS';
}

export interface ReceiveFedInstitutionsAction {
    type: 'RECEIVE_FEDINSTITUTIONS';
    fedInstitutions: FederalInstitution[];
}

export interface ReceiveFedInstitutionTypesAction {
    type: 'RECEIVE_FEDINSTITUTIONTYPES';
    fedInstitutionTypes: FederalEntityType[];
}

export interface RequestInstitutionsAction {
    type: 'REQUEST_INSTITUTIONS';
}

export interface ReceiveInstitutionsAction {
    type: 'RECEIVE_INSTITUTIONS';
    activeInstitutions: Array<Institution>;
    cnt: number;
}

export interface SelectDeptDBAction {
    type: 'SELECT_DEPTDB';
    activeDeptDB: DepartmentDB;
}

export interface UnAssignFederalInstitutionAction {
    type: 'UNASSIGN_FEDINSTITUTION';
}

export interface UpdateInstitutionSelection {
    type: 'UPDATE_INSTITUTION_SELECTION';
    indices: string[];
}

export interface Department {
    DeptID: number;
    Name: string;
    Color: string;
}

export interface DepartmentDB {
    DeptDBID: number;
    Name: string;
    DeptID: number;
    Connection?: string;
    Server: string;
    DBName: string;
    Abbrev: string;
    HasRegions: boolean;
    IsActive: boolean;
    Pct: number;
    Color: string;
    EntityName: string;
    LastModified?: Date;
    LastModifiedUser?: string;
    Department: Department;
    Institutions: Institution[];
}

export interface DepositInstitution {
    BA_ID: number;
    BA_KEY_ID: number;
}

export interface Institution {
    InstitutionID: string;
    CustomID: string;
    Name: string;
    StateCode: string;
    InstitutionType: InstitutionType;
    InstitutionTypeID: number;
    Region: string;
    RSSDID?: number;
    HCID: number;
    DeptDBID: number;
    FederalInstitution?: FederalInstitution;
    IsSelected: boolean;
    IsAssigned: boolean;
}

export interface InstitutionType {
    InstitutionTypeID: number;
    Name: string;
}

export interface FederalInstitution {
    RSSDID: number;
    HeadRSSDID: number;
    HCRSSDID?: number;
    Name: string;
    FullName: string;
    FederalEntityTypeCode: string;
    CharterTypeID?: number;
    EstablishmentTypeID: number;
    Street1: string;
    Street2?: string;
    City: string;
    StateCode: string;
    ZipCode: string;
    CountryCode: number;
    CountryName: string;
    Province?: string;
    Url?: string;
    NAICS?: string;
    FDICID?: number;
    TaxID?: number;
    IsHCCode?: boolean;
    IsSLHoldingCompany?: boolean;
    BankCnt?: number;
    StartDate: Date;
    CloseDate: Date;
    TerminationReasonID?: number;
    IsActive: boolean;
    IsBranch: boolean;
    FederalInstitutionCounts: FederalInstitutionCount[];
    FederalEntityType: FederalEntityType;
    Institutions: Institution[];
    HoldingCompany: FederalInstitution;
    TotalAssets: number;
}

export interface FederalInstitutionCount {
    DepartmentDB: DepartmentDB;
    Count: number;
}

export interface FederalEntityType {
    FederalEntityTypeCode: string;
    Name: string;
    Description?: string;
}

export interface InstitutionFilter {
    deptDBID: number | null;
    RSSDID: number | null;
    searchTxt: string;
    isStartsWith: boolean;
    selectedAssignmentFilter: string;
    selectedStates: string[];
    selectedTypes: number[];
}

export interface FedInstitutionFilter {
    RSSDID: number | undefined;
    searchTxt: string;
    isStartsWith: boolean;
    selectedStates: string[];
    selectedTypes: string[];
    searchBankingTypes: boolean;
    searchHoldingCompanies: boolean;
}

export interface State {
    IsActive: boolean;
    Name: string;
    StateCode: string;
}