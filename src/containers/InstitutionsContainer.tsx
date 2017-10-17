import * as React from 'react';
import { Component } from 'react';
import {
    ApplicationState,
} from '../store';
import { InstitutionList } from '../components/InstitutionList';
import {
    InstitutionState,
} from './../services/data-types';
import * as actions from '../actions/InstitutionActions';
import { connect } from 'react-redux';
// import { UserAgentApplication } from 'msalx';

type Props = InstitutionState &
    typeof actions.actionCreators;

interface StateInterface {
    pic: {body: string} | null;
  }

export class InstitutionContainer extends Component<Props, StateInterface> {
    // componentDidMount() {
    //     const clientId = '8b8e7508-5d17-4800-9c56-a04d55ea53f5';

    //     const userAgentApplication =
    //         new UserAgentApplication(
    //             clientId,
    //             '',
    //             (errorDes: string, token: string, error: string, tokenType: string) => {
    //                 console.dir('success');
    //             });

    //     if (localStorage.getItem('user') !== null) {
    //         userAgentApplication.loginPopup(['user.read']).then((token) => {
    //             const user = userAgentApplication.getUser();
    //             console.dir(user.displayableId);

    //             localStorage.setItem('user', JSON.stringify(user));

    //             // var t = window.location.href.split('access_token=').pop().split('&')[0];
    //             userAgentApplication.acquireTokenSilent(['user.read']).then(x => {

    //                 fetch(`https://graph.microsoft.com/v1.0/me/photo/$value`, {
    //                     method: 'GET',
    //                     headers: { 'Authorization': `Bearer ${x}`, responseType: 'blob' }
    //                 }).then(response => response); // .then(text => this.setState({pic: text}));
    //             });
    //         }).catch(result => {
    //             console.dir('Error calling the Web api:\n' + result);
    //         });
    //     }
    // }

    constructor(props: Props) {
        super(props);

        this.state = { pic: null };
    }

render() {
    const { pic } = this.state;
    return (
        <div>
            {pic &&
                < img src={pic.body} />
            }
            <InstitutionList
                {...this.props}
            />
        </div>
    );
}
}

export default connect(
    (state: ApplicationState) => state.institutionSlice,
    actions.actionCreators
)(InstitutionContainer);