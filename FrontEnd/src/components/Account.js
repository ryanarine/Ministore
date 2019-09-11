import React from "react";
import { homeUrl } from "./Constants";

function goToSignUp() {
  window.location = homeUrl + "signup";
}

function goToLogin() {
  window.location = homeUrl + "login";
}

function goToDeposit() {
  window.location = homeUrl + "wallet";
}

function removeStorage() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("hash");
  window.location = homeUrl; // force refresh
}

function Account(props) {
  if (props.name !== "") {
    return (
      <React.Fragment>
        <input className="negButton right" type="submit" value="Logout" onClick={removeStorage} />
        <input className="posButton right" type="submit" value="Add Money" onClick={goToDeposit} />
        <p className="right"> {"$" + Number(props.wallet).toFixed(2)}</p>
        <h3 className="right"> Hello {props.name} </h3>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <input className="neutralBg right" type="submit" value="Sign Up" onClick={goToSignUp} />
      <input className="neutralBg right" type="submit" value="Sign In" onClick={goToLogin} />
    </React.Fragment>
  );
}

export default Account;
