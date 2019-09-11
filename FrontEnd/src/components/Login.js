import React from "react";
import axios from "axios";
import { baseUrl } from "./Constants";
import AccountBox from "./AccountBox";

function Login() {
  let labels = ["Username", "Password"];
  let types = ["text", "password"];
  let names = ["unamefield", "pswfield"];
  return <AccountBox submit={handleLogin} labels={labels} types={types} names={names} />;
}

function handleLogin(event) {
  event.preventDefault();
  let username = event.target.elements.unamefield.value;
  let password = event.target.elements.pswfield.value;
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  axios({
    method: "post",
    url: baseUrl + "login",
    data: params
  }).then(res => {
    if (res.data === 401) {
      alert("Username or Password is incorrect");
    } else {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("hash", res.data);
      window.location = "/";
    }
  });
}

export default Login;
