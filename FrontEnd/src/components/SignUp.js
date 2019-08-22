import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { baseUrl } from './Constants';

class SignUp extends Component {
    constructor() {
        super();
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(event) {
        let name = document.getElementById('namefield').value;
        let username = document.getElementById('unamefield').value;
        let password = document.getElementById('pswfield').value;
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('username', username);
        params.append('password', password);
        axios({
            method: 'post',
            url: baseUrl + 'user/add',
            data: params,
        }).then(res => {
            if (res.data === 401) {
                alert("Username has already been taken");   
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
                <label> Display Name
				<input type="text" id="namefield" required />
                </label>
                <label> Username
				<input type="text" id="unamefield"required />
                </label>
                <label> Password
				<input type="password" id="pswfield" required />
                </label>
                <input type="submit" value="Sign Up" className="accountButton" onClick={this.handleSignUp} />
                <Link to="/"><input className="cancelButton" type="submit" value="Cancel" /></Link>
            </form>
        );
    }
}

export default SignUp