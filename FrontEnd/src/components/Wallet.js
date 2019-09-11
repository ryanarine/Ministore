import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCredentials, setSessionItems, baseUrl, homeUrl } from "./Constants";
import "./styles/Account.css";
import axios from "axios";

class Wallet extends Component {
  constructor() {
    super();
    this.state = { verified: false, wallet: 0.0, deposit: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      this.setState({ deposit: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let deposit = Number(this.state.deposit).toFixed(2);
    if (deposit <= 0) {
      alert("You must deposit a positive value");
      return;
    }
    const params = setSessionItems();
    params.append("deposit", deposit);
    axios({
      method: "post",
      url: baseUrl + "transaction/deposit",
      data: params
    })
      .then(() => (window.location = homeUrl))
      .catch(() => (window.location = homeUrl + "login"));
  }

  render() {
    if (this.state.verified) {
      return (
        <form autoComplete="off" className="accountBox" onSubmit={this.handleSubmit}>
          <label> Your current balance is: {Number(this.state.wallet).toFixed(2)}</label>
          <input
            type="text"
            value={this.state.deposit}
            name="deposit"
            onChange={this.handleChange}
          />
          <label>
            Your final balance will be:
            {"\n" + (Number(this.state.wallet) + Number(this.state.deposit)).toFixed(2)}
          </label>
          <input className="posButton" type="submit" value="Deposit" />
          <Link to="/">
            <input className="negButton" type="submit" value="Cancel" />
          </Link>
        </form>
      );
    }
    return <React.Fragment></React.Fragment>;
  }

  componentDidMount() {
    let credentials = getCredentials();
    if (credentials) {
      credentials.then(data =>
        this.setState({
          verified: true,
          wallet: data.wallet
        })
      );
    }
  }
}

export default Wallet;
