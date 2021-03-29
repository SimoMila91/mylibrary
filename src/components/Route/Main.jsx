import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Book from '../Book';
import Home from '../Home';
import Logout from '../logRegLog/Logout';
import SignUp from '../logRegLog/SignUp';
import Login from '../logRegLog/Login';
import ArticleList from '../articles/ArticleList';
import PrivateRoute from './PrivateRoute';


export default function Main() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Book} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/article" component={ArticleList} />
        </Switch>
    )


};