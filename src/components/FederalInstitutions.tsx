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
import styled from 'styled-components';
import Loader from './Loader';
import FederalInstitutionSearchContainer from './FederalInstitutionSearchContainer';
import numeral from 'numeral';

const fedUrl = `https://www.ffiec.gov/nicpubweb/nicweb/InstitutionProfile.aspx?parID_Rssd=`;
const fdicUrl = 'https://research.fdic.gov/bankfind/results.html?fdic=';
const charterUrl = 'http://mapping.ncua.gov/SingleResult.aspx?ID=';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
`;

type Props = FederalInstitutionState &
    typeof actions.actionCreators;

const Content = Layout.Content;
const labelStyle = {
    width: '35%',
    textAlign: 'right',
    padding: 3,
};

const contentStyle = {
    width: '65%',
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

const FederalInstitutions = ({
    assignFed,
    fedInstitutions,
    fedInstitutionFilter,
    fedInstitutionsLoading,
    setFedInstitutionFilter,
    selectedCustomIDs,
    updateFedInstitutionFilter,
}: Props) => {

    return (
        <MainContainer>
            <FederalInstitutionSearchContainer />
            {
                fedInstitutionsLoading
                    ? <Loader />
                    : <Content style={{ overflowX: 'auto', whiteSpace: 'nowrap' } as React.CSSProperties}>
                        {
                            fedInstitutions && fedInstitutions.map(f =>
                                <Card
                                    key={f.RSSDID}
                                    style={{ display: 'inline-block', margin: '10px 5px', width: 300, height: 200 }}
                                    title={
                                        <span>
                                            <Tooltip placement="topLeft" title={f.FullName}>
                                                <span style={{ color: f.Institutions.length > 0 ? 'green' : 'black' }}>
                                                    {f.Name}
                                                </span>
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
                                    <Card.Grid
                                        style={contentStyle}
                                    >{
                                            f.TotalAssets
                                                ? numeral(f.TotalAssets).format('$0,0')
                                                : 'N/A'
                                        }
                                    </Card.Grid>
                                    {
                                        f.Url
                                            ? [
                                                <Card.Grid
                                                    key="label"
                                                    style={labelStyle}
                                                >
                                                    WEBSITE
                                                </Card.Grid>,
                                                <Card.Grid
                                                    style={contentStyle}
                                                    key="content"
                                                >
                                                    <a
                                                        target="_blank"
                                                        href={
                                                            f.Url
                                                                && f.Url.startsWith('http')
                                                                ? f.Url
                                                                : `http://${f.Url}`
                                                        }
                                                    >
                                                        {f.Url}
                                                    </a>
                                                </Card.Grid>
                                            ]
                                            : null
                                    }
                                    {
                                        f.FDICID
                                            ? (
                                                [
                                                    <Card.Grid
                                                        key="label"
                                                        style={labelStyle}
                                                    >
                                                        FDIC
                                                    </Card.Grid>,
                                                    <Card.Grid
                                                        style={contentStyle}
                                                        key="content"
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={`${fdicUrl}${f.FDICID}`}
                                                        >
                                                            {f.FDICID}
                                                        </a>
                                                    </Card.Grid>
                                                ]
                                            )
                                            : null
                                    }
                                    {
                                        f.CharterNo
                                            ? (
                                                [
                                                    <Card.Grid
                                                        key="label"
                                                        style={labelStyle}
                                                    >
                                                        CHARTER NO
                                                    </Card.Grid>,
                                                    <Card.Grid
                                                        key="content"
                                                        style={contentStyle}
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={`${charterUrl}${f.CharterNo}`}
                                                        >
                                                            {f.CharterNo}
                                                        </a>
                                                    </Card.Grid>
                                                ]
                                            )
                                            : null
                                    }
                                </Card>
                            )
                        }
                    </Content>
            }
        </MainContainer>
    );
};

export default FederalInstitutions;