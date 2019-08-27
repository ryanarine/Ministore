import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { baseUrl } from './Constants';

class Login extends Component {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        let username = event.target.elements.unamefield.value;
        let password = event.target.elements.pswfield.value;
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        axios({
            method: 'post',
            url:  baseUrl + 'login', 
            data: params,
        }).then(res => {
            if (res.data === 401) {
                alert("Username or Password is incorrect")
            }
            else {
                document.cookie = "username=" + username;
                document.cookie = "hash=" + res.data;
                window.location = "/";
            }
        });
        event.preventDefault();
    }

    render() {
        return (
            <form className="accountBox" onSubmit={this.handleLogin}>
                <label> Username
				<input type="text" name="unamefield" id="loginInput" required />
                </label>
                <label> Password
				<input type="password" name="pswfield" id="loginInput" required />
                </label>
                <input id="posButton" type="submit" value="Login"/>
                <Link to="/"><input id="negButton" type="submit" value="Cancel" /></Link>
            </form>
        );
    }
}

export default Login