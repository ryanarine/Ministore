import React from "react";
import axios from "axios";
import { baseUrl } from "./Constants";
import AccountBox from "./AccountBox";

function SignUp() {
  let labels = ["Display Name", "Username", "Password"];
  let types = ["text", "text", "password"];
  let names = ["namefield", "unamefield", "pswfield"];
  return <AccountBox submit={handleSignUp} labels={labels} types={types} names={names} />;
}

function handleSignUp(event) {
  let name = event.target.elements.namefield.value;
  let username = event.target.elements.unamefield.value;
  let password = event.target.elements.pswfield.value;
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("username", username);
  params.append("password", password);
  axios({
    method: "post",
    url: baseUrl + "user/add",
    data: params
  }).then(res => {
    if (res.data === 409) {
      alert("Username has already been taken");
    } else {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("hash", res.data);
      window.location = "/";
    }
  });
  event.preventDefault();
}

export default SignUp;
