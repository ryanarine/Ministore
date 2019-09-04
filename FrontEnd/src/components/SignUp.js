import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Account.css';
import { baseUrl } from './Constants';

class SignUp extends Component {
    constructor() {
        super();
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(event) {
        let name = event.target.elements.namefield.value;
        let username = event.target.elements.unamefield.value;
        let password = event.target.elements.pswfield.value;
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
            <form className="accountBox" onSubmit={this.handleSignUp}>
                <label> Display Name
				<input type="text" name="namefield" required />
                </label>
                <label> Username
				<input type="text" name="unamefield" required />
                </label>
                <label> Password
				<input type="password" name="pswfield" required />
                </label>
                <input type="submit" value="Sign Up" id="posButton" />
                <Link to="/"><input id="negButton" type="submit" value="Cancel" /></Link>
            </form>
        );
    }
}

export default SignUp