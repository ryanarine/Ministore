import React, { Component } from "react";
import axios from "axios";
import { baseUrl, MASTER } from "./Constants";
import AccountBox from "./AccountBox";
import UserTable from "./UserTable";

class UserList extends Component {
  constructor() {
    super();
    this.state = { modal: true, list: [] };
    this.handleLogin = this.handleLogin.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    let username = event.target.elements.unamefield.value;
    let password = event.target.elements.pswfield.value;
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    axios({
      method: "post",
      url: baseUrl + "stafflogin",
      data: params
    }).then(res => {
      if (res.data === 401) {
        alert("Username or Password is incorrect");
      } else if (res.data !== MASTER) {
        alert("You are not authorized to access this page");
      } else {
        this.setState({ modal: false }, this.getUsers);
      }
    });
  }

  getUsers() {
    axios.get(baseUrl + "nonMasterUsers").then(res => {
      this.setState({ list: res.data.list });
    });
  }

  render() {
    if (this.state.modal) {
      let labels = ["Username", "Password"];
      let types = ["text", "password"];
      let names = ["unamefield", "pswfield"];
      return (
        <AccountBox
          submit={this.handleLogin}
          labels={labels}
          types={types}
          names={names}
        />
      );
    }
    if (this.state.list === []) {
      return <p style={{ color: "white" }}>Loading User Table...</p>;
    }
    return <UserTable users={this.state.list} />;
  }

  componentDidMount() {
    this.getUsers();
  }
}

export default UserList;
