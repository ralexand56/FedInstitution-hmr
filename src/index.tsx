import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
// import DepartmentDBsView from './components/DepartmentDBsView';
// import InstitutionsView from './components/InstitutionsView';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './configureStore';
import {
  actionCreators
} from './store/DepartmentDBReducer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueGrey500 } from 'material-ui/styles/colors';
import registerServiceWorker from './registerServiceWorker';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: blueGrey500,
    primary1Color: blueGrey500,
  },
  appBar: {
    height: 40,
  },
});

// const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore();

store.dispatch(actionCreators.init());
store.dispatch(actionCreators.requestDepartmentDBs('', store.getState().departmentDBs.institutionFilter));

// const render = (Component: Function) => 
// injectTapEventPlugin();
ReactDOM.render(
  (
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    </AppContainer>
  ),
  document.getElementById('root') as HTMLElement
);

// render(App);

// if (module.hot) {
//   module.hot.accept('./App', () => render(App));
// }

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}

registerServiceWorker();