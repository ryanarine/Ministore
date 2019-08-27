import React, { Component } from 'react';
import './Account.css';

class Account extends Component {
    constructor() {
        super();
        this.goToLogin = this.goToLogin.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.removeCookies = this.removeCookies.bind(this);
    }

    goToSignUp() {
        window.location += "signup";
    }

    goToLogin() {
        window.location += "login";
    }

    removeCookies() {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "hash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        window.location = window.location + ""; // force refresh
    }

    render() {
        if (this.props.name !== "") {
            return (<div>
                <input id="negButton" type="submit" value="Logout" onClick={this.removeCookies} />
                <h3> Hello {this.props.name} </h3>
            </div>);
        }
        return (
            <div>
                <input id="neutralBg" type="submit" value="Sign Up" onClick={this.goToSignUp} />
                <input id="neutralBg" type="submit" value="Sign In" onClick={this.goToLogin} />
            </div>
        );
    }
}

export default Account;