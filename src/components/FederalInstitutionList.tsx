import * as React from 'react';
import {
    FederalInstitutionState,
} from '../services/data-types';
import {
    Card,
    Icon,
    Layout,
    Menu,
    Tooltip,
} from 'antd';
import * as actions from '../actions/FederalInstitutionActions';

import FederalInstitutionSearchContainer from './FederalInstitutionSearchContainer';

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

// const Option = Select.Option;
const Content = Layout.Content;
const labelStyle = {
    width: '30%',
    textAlign: 'right',
    padding: 3,
};

const contentStyle = {
    width: '70%',
    textAlign: 'left',
    padding: 3,
};

const miniLabelStyle = {
    width: '20%',
    textAlign: 'right',
    padding: 3,
};

const miniContentStyle = {
    width: '30%',
    textAlign: 'left',
    padding: 3,
};

// const menuStyle = {
//     width: '100%',
//     textAlign: 'right',
//     padding: 3,
// };

const FederalInstitutionList = ({
    assignFed,
    fedInstitutions,
    fedInstitutionFilter,
    setFedInstitutionFilter,
    selectedCustomIDs,
    updateFedInstitutionFilter,
}: Props) => {
    let fedUrl = `https://www.ffiec.gov/nicpubweb/nicweb/InstitutionProfile.aspx?parID_Rssd=`;

    return (
        <Layout style={{ height: 300 }}>
            <FederalInstitutionSearchContainer />
            <Content style={{ overflowX: 'auto', whiteSpace: 'nowrap' } as React.CSSProperties}>
                {
                    fedInstitutions && fedInstitutions.map(f =>
                        <Card
                            key={f.RSSDID}
                            style={{ display: 'inline-block', margin: '10px 5px', width: 300, height: 200 }}
                            title={
                                <span>
                                    <Tooltip placement="topLeft" title={f.FullName}>
                                        {f.Name}
                                    </Tooltip>
                                </span>}
                            extra={
                                <Menu
                                    mode="inline"
                                    inlineCollapsed={true}
                                    onClick={() => assignFed(f)}
                                    style={{ padding: 3, textAlign: 'right' }}
                                    theme="dark"
                                >
                                    <Menu.Item
                                        disabled={selectedCustomIDs.length === 0}    
                                        key="lock"
                                    >
                                        <Icon type="lock" />
                                        <span>Link</span>
                                    </Menu.Item>
                                </Menu>}
                        >
                            <Card.Grid style={miniLabelStyle}>RSSDID</Card.Grid>
                            <Card.Grid style={miniContentStyle}>
                                <a
                                    target="_blank"
                                    href={`${fedUrl}${f.RSSDID}&parDT_END=99991231`}
                                >
                                    {f.RSSDID}
                                </a>
                            </Card.Grid>
                            <Card.Grid style={miniLabelStyle}>State</Card.Grid>
                            <Card.Grid style={miniContentStyle}>
                                {f.StateCode}
                            </Card.Grid>
                            <Card.Grid style={labelStyle}>TYPE</Card.Grid>
                            <Card.Grid style={contentStyle}>{f.FederalEntityType.Name}</Card.Grid>
                            <Card.Grid style={labelStyle}>ASSIGNED</Card.Grid>
                            <Card.Grid style={contentStyle}>{f.Institutions.length}</Card.Grid>
                            <Card.Grid style={labelStyle}>TOTAL ASSETS</Card.Grid>
                            <Card.Grid style={contentStyle}>{f.TotalAssets ? f.TotalAssets : 'N/A'}</Card.Grid>
                            <Card.Grid style={labelStyle}>WEBSITE</Card.Grid>
                            <Card.Grid style={contentStyle}>
                                <a
                                    target="_blank"
                                    href={f.Url && f.Url.startsWith('http') ? f.Url : `http://${f.Url}`}
                                >
                                    {f.Url}
                                </a>
                            </Card.Grid>
                        </Card>
                    )
                }
            </Content>
        </Layout>
    );
};

export default FederalInstitutionList;