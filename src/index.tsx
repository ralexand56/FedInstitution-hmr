import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'core-js';

// import App from './App';
import { AppContainer } from 'react-hot-loader';
// import DepartmentDBsView from './components/DepartmentDBsView';
// import InstitutionsView from './components/InstitutionsView';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './configureStore';
import {
  actionCreators
} from './actions/InitActions';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { blueGrey500 } from 'material-ui/styles/colors';
import registerServiceWorker from './registerServiceWorker';
import StoreContainer from './containers/StoreContainer';
// import * as injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: blueGrey500,
//     primary1Color: blueGrey500,
//   },
//   appBar: {
//     height: 40,
//   },
// });

// const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore();

store.dispatch(actionCreators.init());

const root = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    (
      <AppContainer>
        <Provider store={store}>
          <StoreContainer />
        </Provider>
      </AppContainer>
    ),
    root
  );
};

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}

render();

registerServiceWorker();