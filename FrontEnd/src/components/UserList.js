import React, { Component } from "react";
import axios from "axios";
import { baseUrl, getCrenditals, homeUrl } from "./Constants";
import UserTable from "./UserTable";

class UserList extends Component {
  constructor() {
    super();
    this.state = { list: [] };
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    let [username, hash] = getCrenditals();
    axios
      .get(baseUrl + "nonMasterUsers/" + username + "/" + hash)
      .then(res => this.setState({ list: res.data.list }))
      .catch(() => (window.location = homeUrl));
  }

  render() {
    return <UserTable users={this.state.list} />;
  }

  componentDidMount() {
    this.getUsers();
  }
}

export default UserList;
