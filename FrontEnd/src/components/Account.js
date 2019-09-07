import React, { Component } from "react";
import { homeUrl } from "./Constants";

class Account extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.removeStorage = this.removeStorage.bind(this);
  }

  goToSignUp() {
    window.location = homeUrl + "signup";
  }

  goToLogin() {
    window.location = homeUrl + "login";
  }

  removeStorage() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("hash");
    window.location = homeUrl; // force refresh
  }

  render() {
    if (this.props.name !== "") {
      return (
        <div>
          <input
            className="negButton"
            type="submit"
            value="Logout"
            onClick={this.removeStorage}
          />
          <h3> Hello {this.props.name} </h3>
        </div>
      );
    }
    return (
      <div>
        <input
          className="neutralBg"
          type="submit"
          value="Sign Up"
          onClick={this.goToSignUp}
        />
        <input
          className="neutralBg"
          type="submit"
          value="Sign In"
          onClick={this.goToLogin}
        />
      </div>
    );
  }
}

export default Account;
