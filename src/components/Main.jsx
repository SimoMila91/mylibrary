import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Book from './Book';
import Home from './Home';
import Logout from './signInUp/Logout';


export default function Main() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Book} />
            <Route path="/logout" component={Logout} />
        </Switch>
    )


};