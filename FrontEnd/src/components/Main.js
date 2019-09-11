import React from "react";
import { Switch, Route } from "react-router";
import Store from "./Store";
import Login from "./Login";
import SignUp from "./SignUp";
import UserList from "./UserList";
import Wallet from "./Wallet";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Store} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={SignUp} />
    <Route exact path="/userlist/" component={UserList} />
    <Route exact path="/wallet/" component={Wallet} />
  </Switch>
);

export default Main;
