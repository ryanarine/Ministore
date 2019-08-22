import React from 'react';
import { Switch, Route } from 'react-router';
import Store from './Store';
import Login from './Login';
import SignUp from './SignUp';

const Main = () => (
        <Switch>
            <Route exact path="/" component={Store} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/signup/" component={SignUp} />
        </Switch>
)

export default Main;
