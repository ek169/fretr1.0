import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Background from '../containers/Background';
import {allReducers} from '../reducers/reducers';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
export const urlStart = 'http://localhost:5000';
//"https://morning-dusk-88889.herokuapp.com";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends Component {

  render() {
    return (
        <MuiThemeProvider>
            <Provider store={store}>
                <Background/>
            </Provider>
        </MuiThemeProvider>
    )
  }
}
