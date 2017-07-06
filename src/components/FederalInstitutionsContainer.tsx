import * as React from 'react';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';
// import { ApplicationState } from '../store';
// import { connect } from 'react-redux';
// import { FederalInstitutionView } from './FederalInstitutionView';
import * as FederalInstitutionActions from '../actions/FederalInstitutionActions';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';

import {
    FederalInstitutionState,
} from './../services/data-types';

type FedInstitutionsProps = FederalInstitutionState &
    typeof FederalInstitutionActions.actionCreators;

const styles = {
    mainContainer: {
        margin: 5,
        height: '100%',
    } as React.CSSProperties,
    fedContainer: {
        width: '100%',
        overflow: 'auto',
        display: 'flex',
    } as React.CSSProperties,
};

const Header = (props: FedInstitutionsProps) => {
    let { fedInstitutions } = props;

    return (
        <AppBar
            titleStyle={{ fontSize: 20 }}
            showMenuIconButton={false}
            title={(
                <span>Federal Institutions <small> | Count: {fedInstitutions.length}</small></span>
            )}
        />
    );
};

const SearchBar = (props: FedInstitutionsProps) => {
    let {
        fedInstitutionFilter,
        fedInstitutionTypes,
        states,
     } = props;

    return (
        <Toolbar style={{ height: 35, fontSize: 20 }}>
            <ToolbarGroup firstChild={true}>
                <ToolbarTitle text="Search" />
                <TextField
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearchTxtChanged(e, props)}
                    hintText="search by name..."
                />
                <Toggle
                    style={{ width: 70 }}
                    defaultToggled={true}
                    label={fedInstitutionFilter.isStartsWith ? 'starts' : 'contains'}
                />
            </ToolbarGroup>
            <ToolbarGroup>
                <TextField
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleRSSDIDChanged(e, props)}
                    hintText="enter RSSDID..."
                />
                <SelectField
                    style={{ fontSize: 15 }}
                    multiple={true}
                    value={fedInstitutionFilter.selectedTypes}
                    onChange={(e, ind, newVal) => handleSelectedTypeChanged(e, ind, newVal, props)}
                >
                    <MenuItem
                        value={''}
                        primaryText="Select Type"
                    />
                    {
                        fedInstitutionTypes.map(fedType =>
                            (
                                <MenuItem
                                    key={fedType.FederalEntityTypeCode}
                                    value={fedType.FederalEntityTypeCode}
                                    primaryText={fedType.Name}
                                />
                            )
                        )}
                </SelectField>
                <SelectField
                    style={{ fontSize: 15 }}
                    multiple={true}
                    value={fedInstitutionFilter.selectedStates}
                    onChange={(e, ind, newVal) => handleSelectedStateChanged(e, ind, newVal, props)}
                >
                    <MenuItem
                        value={''}
                        primaryText="Select State"
                    />
                    {
                        states.map(fedState =>
                            (
                                <MenuItem
                                    key={fedState.StateCode}
                                    value={fedState.StateCode}
                                    primaryText={fedState.Name}
                                />
                            )
                        )}
                </SelectField>
            </ToolbarGroup>
            <ToolbarSeparator />
        </Toolbar>
    );
};

const handleSelectedStateChanged = (
    evt: React.FormEvent<{}>,
    index: number,
    newVal: string[],
    props: FedInstitutionsProps) => {

    props.setFedInstitutionFilter({
        ...props.fedInstitutionFilter,
        selectedStates: Array.isArray(newVal) && newVal.length === 0 ? [''] : newVal,
    });
};

const handleSearchTxtChanged = (e: React.KeyboardEvent<HTMLInputElement>, props: FedInstitutionsProps) => {
    if (e.keyCode === 13) {
        props.setFedInstitutionFilter({
            ...props.fedInstitutionFilter,
            searchTxt: e.currentTarget.value
        });
    }
};

const handleSelectedTypeChanged = (
    evt: React.FormEvent<{}>,
    index: number,
    newVal: string[],
    props: FedInstitutionsProps) => {

    props.setFedInstitutionFilter({
        ...props.fedInstitutionFilter,
        selectedTypes: newVal.length === 0 ? [''] : newVal.filter(x => x !== ''),
    });
};

const handleRSSDIDChanged = (e: React.KeyboardEvent<HTMLInputElement>, props: FedInstitutionsProps) => {
    if (e.keyCode === 13) {
        let newVal = e.currentTarget.value;

        props.setFedInstitutionFilter({
            ...props.fedInstitutionFilter,
            RSSDID: newVal.trim() === '' ? undefined : parseInt(newVal, 10)
        });
    }
};

export default class FederalInstitutionsContainer extends Component<FedInstitutionsProps, void> {

    render() {
        // let {
        //     fedInstitutions,
        // } = this.props;

        return (
            <Paper style={styles.mainContainer} zDepth={2}>
                <Header {...this.props} />
                <SearchBar {...this.props} />
                <div style={styles.fedContainer} />
            </Paper>
        );
    }
}

// export default connect(
//     (state: ApplicationState) => state.departmentDBs,
//     DepartmentDBStore.actionCreators
// )(FederalInstitutionsContainer);