import * as React from 'react';
import { Component } from 'react';
import Divider from 'material-ui/Divider';
import { ApplicationState } from '../store';
import CircularProgress from 'material-ui/CircularProgress';
import * as DepartmentDBStore from '../store/DepartmentDBReducer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import * as Radium from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow,
} from 'material-ui/Table';

import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';

import {
    DepartmentDBState,
} from './../services/data-types';

type InstitutionsProps = DepartmentDBState &
    typeof DepartmentDBStore.actionCreators;

const styles = {
    td: {
        height: 20
    } as React.CSSProperties,
    mainContainer: {
        height: '60%',
        flow: 1,
        backgroundColor: 'white',
        margin: 5,
        overflow: 'auto',
    } as React.CSSProperties,
    loader: {
        margin: 100,
    }
};

const handleSearchTxtChanged = (e: React.KeyboardEvent<HTMLInputElement>, props: InstitutionsProps) => {
    if (e.keyCode === 13) {
        let newVal = e.currentTarget.value;
        props.setInstitutionFilter({ ...props.institutionFilter, searchTxt: newVal, });
    }
};

const handleAssignmentFilterChanged = (
    evt: React.FormEvent<{}>,
    index: number,
    value: number,
    props: InstitutionsProps,
) => {
    props.setInstitutionFilter({ ...props.institutionFilter, selectedAssignmentFilter: value });
};

interface AppState {
    selectedState: Array<string> | null;
}

@Radium
export class InstitutionsContainer extends Component<InstitutionsProps, AppState> {
    node: SelectField;
    isStartsWith: boolean = true;

    constructor(props: InstitutionsProps) {
        super(props);

        this.state = { selectedState: [] };
    }

    handleSelectedStateChanged = (
        evt: React.FormEvent<{}>,
        index: number,
        value: Array<string>) => {
        this.setState({ selectedState: value });

        this.props.setInstitutionFilter({ ...this.props.institutionFilter, selectedStates: value });
    }

    handleSelectedInstTypeChanged = (
        evt: React.FormEvent<{}>,
        index: number,
        value: number[]) => {

        this.props.setInstitutionFilter({ ...this.props.institutionFilter, selectedTypes: value });
    }

    handleSelectAll = () => {
        this.props.selectAll();
    }

    handleSelectNone = () => {
        this.props.selectNone();
    }

    handleToggleSelection(rows: number[] | string) {
        this.props.updateInstitutionSelection(rows);
    }

    handleStartsWithToggle(e: React.FormEvent<{}>, isInputChecked: boolean) {
        this.props.setInstitutionFilter({ ...this.props.institutionFilter, isStartsWith: isInputChecked, });
    }

    handleLoadRSSDID = (e: React.MouseEvent<{}>, RSSDID: number | undefined) => {
        e.stopPropagation();

        this.props.setFedInstitutionFilter({ ...this.props.fedInstitutionFilter, RSSDID: RSSDID });
    }

    public render() {
        let {
            activeDeptDB,
            activeInstitutions,
            institutionsLoading,
            institutionFilter,
            institutionTotalCnt,
            institutionTypes,
            selectedInstitutionIndices,
            states,
         } = this.props;

        let arr: number[] = [];

        if (typeof (selectedInstitutionIndices) !== 'string') {
            arr = selectedInstitutionIndices;
        }

        return (
            <Paper style={styles.mainContainer} zDepth={2}>
                <Toolbar
                    style={{ height: 30, fontSize: 20 }}
                >
                    <ToolbarGroup>
                        {activeDeptDB && (
                            <span>{activeDeptDB!.Name}
                                <small> | Count: {institutionTotalCnt}</small></span>
                        )}
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text={`Selection: ${selectedInstitutionIndices.length}`} />
                    </ToolbarGroup>
                </Toolbar>
                <Toolbar style={{ height: 35, fontSize: 20 }}>
                    <ToolbarGroup>
                        <ToolbarTitle text="Search" />
                        <SelectField
                            value={institutionFilter.selectedAssignmentFilter}
                            onChange={(e, ind, newVal) => handleAssignmentFilterChanged(e, ind, newVal, this.props)}
                        >
                            <MenuItem
                                key={1}
                                value={1}
                                primaryText={'All'}
                            />
                            <MenuItem
                                key={2}
                                value={2}
                                primaryText={'Unassigned'}
                            />
                            <MenuItem
                                key={3}
                                value={3}
                                primaryText={'Assigned'}
                            />
                        </SelectField>
                        <Divider />
                        <TextField
                            style={{ padding: '0px' }}
                            onKeyUp={
                                (e: React.KeyboardEvent<HTMLInputElement>) =>
                                    handleSearchTxtChanged(e, this.props)
                            }
                            hintText="search by name..."
                        />
                        <Toggle
                            style={{ width: 70 }}
                            defaultToggled={true}
                            onToggle={(e, isInputChecked) => this.handleStartsWithToggle(e, isInputChecked)}
                            label={institutionFilter.isStartsWith ? 'starts' : 'contains'}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <SelectField
                            value={institutionFilter.selectedStates}
                            style={{ fontSize: 15 }}
                            multiple={true}
                            onChange={this.handleSelectedStateChanged}
                        >
                            <MenuItem
                                value={''}
                                primaryText="Select State"
                            />
                            {
                                states.map(st =>
                                    (
                                        <MenuItem
                                            key={st.StateCode}
                                            value={st.StateCode}
                                            primaryText={st.Name}
                                        />
                                    )
                                )}
                        </SelectField>
                        <SelectField
                            style={{ fontSize: 15 }}
                            multiple={true}
                            value={institutionFilter.selectedTypes}
                            onChange={this.handleSelectedInstTypeChanged}
                        >
                            <MenuItem
                                value={0}
                                primaryText="Select Type"
                            />
                            {
                                institutionTypes.map(typ =>
                                    (
                                        <MenuItem
                                            key={typ.InstitutionTypeID}
                                            value={typ.InstitutionTypeID}
                                            primaryText={typ.Name}
                                        />
                                    )
                                )
                            }
                        </SelectField>
                    </ToolbarGroup>
                    <ToolbarSeparator />
                </Toolbar>
                <Table
                    onRowSelection={(e) => this.handleToggleSelection(e)}
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={true}
                >
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={true}
                        enableSelectAll={true}
                    >
                        <TableRow style={{ height: 20 }} >
                            <TableHeaderColumn style={{ height: 20, textAlign: 'left' }}>ID</TableHeaderColumn>
                            <TableHeaderColumn style={{ height: 20 }}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{ height: 20 }}>State</TableHeaderColumn>
                            <TableHeaderColumn style={{ height: 20 }}>Type</TableHeaderColumn>
                            {(activeDeptDB && activeDeptDB.HasRegions) &&
                                <TableHeaderColumn style={{ height: 20 }}>Region</TableHeaderColumn>}
                            <TableHeaderColumn style={{ height: 20 }}>Fed. Inst.</TableHeaderColumn>
                            <TableHeaderColumn style={{ height: 20 }}>RSSDID</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        displayRowCheckbox={true}
                        stripedRows={true}
                        showRowHover={false}
                    >
                        {activeInstitutions && (activeInstitutions.map((i, ind) => (
                            <TableRow
                                selected={arr.indexOf(ind) !== -1}
                                style={styles.td}
                                key={i.CustomID}
                            >
                                <TableRowColumn
                                    style={{ height: 20, color: i.RSSDID ? 'green' : 'red' }}
                                >
                                    {i.CustomID}
                                </TableRowColumn>
                                <TableRowColumn style={{ height: 20 }} >{i.Name}</TableRowColumn>
                                <TableRowColumn style={{ height: 20 }} >{i.StateCode}</TableRowColumn>
                                <TableRowColumn style={{ height: 20 }} >{i.InstitutionType.Name}</TableRowColumn>
                                {(activeDeptDB && activeDeptDB!.HasRegions) &&
                                    <TableRowColumn style={{ height: 20 }} >{i.Region}</TableRowColumn>}
                                <TableRowColumn style={{ height: 20 }} >
                                    {i.FederalInstitution
                                        && i.FederalInstitution.Name}
                                </TableRowColumn>
                                <TableRowColumn style={{ height: 20 }} >
                                    {
                                        i.RSSDID &&
                                        (
                                            <RaisedButton
                                                label={i.RSSDID}
                                                onClick={(e) => this.handleLoadRSSDID(e, i.RSSDID)}
                                            />
                                        )
                                    }
                                </TableRowColumn>
                            </TableRow>)
                        ))}
                        {institutionsLoading && (
                            <TableRow>
                                <TableRowColumn colSpan={5} style={{ textAlign: 'center' }}>
                                    <CircularProgress style={{ width: '100%' }} mode={'indeterminate'} />
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.departmentDBs,
    DepartmentDBStore.actionCreators
)(InstitutionsContainer);