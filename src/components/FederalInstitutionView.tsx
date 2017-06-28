import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import { Component } from 'react';
// import { ApplicationState } from '../store';
// import * as DepartmentDBStore from '../store/DepartmentDBReducer';
import * as Radium from 'radium';
import {
    FederalInstitution,
} from './../services/data-types';
// import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableRowColumn,
    TableRow,
} from 'material-ui/Table';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import {
//     DepartmentDBState,
// } from './../services/data-types';

// type FedInstitutionViewProps = DepartmentDBState &
//     typeof DepartmentDBStore.actionCreators;

const styles = {
    fedInstitution: {
        minWidth: 250,
        width: 250,
        margin: 5,
    } as React.CSSProperties
};

interface FederalInstitutionProps {
    federalInstitution: FederalInstitution;
    selectedInstitutionIndices: number[];
}

@Radium
export class FederalInstitutionView extends Component<FederalInstitutionProps, void> {

    handleAssignFed = () => {
    //     let { fedInst,
    //         activeDeptDB,
    //         selectedInstitutionIndices,
    // } = this.props;

        // this.props.assignFed(
        //     fedInst,
        //     activeDeptDB!.DeptDBID,
        //     selectedInstitutionIndices
        // );
    }

    render() {
        let {
            federalInstitution,
            selectedInstitutionIndices,
        } = this.props;

        let fedUrl = `https://www.ffiec.gov/nicpubweb/nicweb/InstitutionProfile.aspx?parID_Rssd=`;

        return (
            <Paper style={styles.fedInstitution} zDepth={2}>
                <AppBar
                    titleStyle={{
                        fontSize: 15,
                        color: (federalInstitution.Institutions!.length) ? 'lightgreen' : 'white'
                    }}
                    showMenuIconButton={false}
                    title={(
                        <span>
                            {federalInstitution.Name}
                        </span>
                    )}
                    iconElementRight={(
                        <IconMenu
                            iconButtonElement={
                                <IconButton><MoreVertIcon /></IconButton>
                            }
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            <MenuItem
                                disabled={selectedInstitutionIndices.length === 0}
                                primaryText="Assign"
                                onClick={this.handleAssignFed}
                            />
                            <MenuItem primaryText="Detail" />
                        </IconMenu>
                    )}
                />

                <Table>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        <TableRow style={{ height: 25 }}>
                            <TableRowColumn style={{ height: 25 }}>
                                <span>
                                    RSSDID |
                                <a
                                        target="_blank"
                                        href={`${fedUrl}${federalInstitution.RSSDID}&parDT_END=99991231`}
                                >
                                        {federalInstitution.RSSDID}
                                </a>
                                </span>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow style={{ height: 25 }}>
                            <TableRowColumn style={{ height: 25 }}>
                                <span>Name | {federalInstitution.FullName}</span>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow style={{ height: 25 }}>
                            <TableRowColumn style={{ height: 25 }}>
                                <span>State | {federalInstitution.StateCode}</span>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow style={{ height: 25 }}>
                            <TableRowColumn style={{ height: 25 }}>
                                <span>Type | {federalInstitution.FederalEntityType && 
                                    federalInstitution.FederalEntityType!.Name}</span>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow style={{ height: 25 }}>
                            <TableRowColumn style={{ height: 25 }}>
                                <span>Assigned | {federalInstitution.Institutions.length}</span>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper >
        );
    }
}

export default FederalInstitutionView;

// export default connect(
//     (state: ApplicationState) => state.departmentDBs,
//     DepartmentDBStore.actionCreators
// )(FederalInstitutionView);