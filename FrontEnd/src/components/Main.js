import React from 'react';
import { Switch, Route } from 'react-router';
import Store from './Store';
import Login from './Login';

const Main = () => (
        <Switch>
            <Route exact path="/" component={Store} />
            <Route exact path="/login/" component={Login} />
        </Switch>
)

export default Main;
