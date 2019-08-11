import React from 'react';
import { Switch, Route } from 'react-router';
import Products from './Products';

const Main = () => (
    <div>
        <main>
            <Switch>
                <Route exact path="/" component={Products}/>
            </Switch>
        </main>
    </div>    
)

export default Main;
