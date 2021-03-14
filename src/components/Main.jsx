import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Book from './Book';
import Home from './Home';


export default function Main() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Book} />
        </Switch>
    )


};