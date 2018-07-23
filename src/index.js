import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import App from './App';
// import App from './pages/LoginPage';
// import App from './layouts/MainPageLayout';
// import App from './components/TableComponent';
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
class App extends React.Component {
    render() {
        return (
            <Router>
                <div id="root">
                {
                    RouterConfig.map((route, key) => (
                        // console.log(route);
                        <Route
                        path={route.path}
                        exact
                        render={props => (
                            // <route.layout>
                            //     <route.component/>
                            // </route.layout>
                            // <route.component>
                        React.createElement(route.layout, props, <route.component/>)
                        
                        )} />
                    )) 
                }
            </div>
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
