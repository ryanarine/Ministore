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
        let username = document.getElementById('unamefield').value;
        let password = document.getElementById('pswfield').value;
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
            <form className="accountBox">
                <label> Username
				<input type="text" id="unamefield" required />
                </label>
                <label> Password
				<input type="password" id="pswfield" required />
                </label>
                <input type="submit" value="Login " className="accountButton" onClick={this.handleLogin} />
                <Link to="/"><input className="cancelButton" type="submit" value="Cancel" /></Link>
            </form>
        );
    }
}

export default Login