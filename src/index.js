import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createBrowserHistory } from 'history'
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import {createLogger} from 'redux-logger';
import rootSaga from './sagas';

import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import RouterConfig from './router-config';
import { BlankLayout, MainPageLayout } from './layouts';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
// const routers = [
//     {
//         path: '/',
//         component: <MainPage />,
//         layout: <MainPageLayout/>
//     }, {
//         path: '/login',
//         component: <LoginPage/>,
//         layout: <BlankLayout />
//     }
// ];
function createRouter() {
  
}
// class RootRouter extends React.Component {
//     render() {
//         return (

//         );
//     }
// }
const initialState = {

};

const logger = createLogger({
    // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
    predicate: (getState, action) => action.type !== 'CHANGE_FORM'
})
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger,
      sagaMiddleware
    ),
  ),
)
sagaMiddleware.run(rootSaga)

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div id="root">
                    {
                        RouterConfig.map((route, key) => (
                            // console.log(route);
                            <Route
                                key={key}
                                path={route.path}
                                exact
                                render={props => (
                                // <route.layout>
                                //     <route.component/>
                                // </route.layout>
                                // <route.component>
                            React.createElement(route.layout, props, <route.component {...props}/>)
                            
                            )} />
                        )) 
                    }
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
