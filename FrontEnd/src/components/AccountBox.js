import React from "react";
import { Link } from "react-router-dom";
import "./styles/Account.css";

function AccountBox(props) {
  const inputs = props.labels.map((label, index) => {
    return (
      <label key={index}>
        {label + "\n"}
        <input type={props.types[index]} name={props.names[index]} required />
      </label>
    );
  });
  return (
    <form autoComplete="off" className="accountBox" onSubmit={props.submit}>
      {inputs}
      <input className="posButton" type="submit" value="Login" />
      <Link to="/">
        <input className="negButton" type="submit" value="Cancel" />
      </Link>
    </form>
  );
}

export default AccountBox;
