import React from "react";
import { Button } from 'antd';
import LoginForm from './NormalLoginForm';
import Background from '../../image/login_background.jpg';
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="login-contain">
                <div id="components-form-demo-normal-login">
                    <LoginForm redirect='/' />
                </div>
            </div>
        );
    }
}