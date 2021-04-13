import {
  Route,
  Switch
} from 'react-router-dom';
import React from 'react';
import Book from '../Book';
import Home from '../Home';
import Logout from '../logRegLog/Logout';
import SignUp from '../logRegLog/SignUp';
import Login from '../logRegLog/Login';
import ArticleList from '../articles/ArticleList';
import PrivateRoute from './PrivateRoute';
import PersonalPage from '../usersRoutes/PersonalPage';
import Faq from '../Faq';
import Settings from '../settings/Settings';


export default function Main() {
  return (
    <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Book} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/faq" component={Faq} />
            <Route path="/settings" component={Settings} />
            <PrivateRoute path="/articles" component={ArticleList} />
            <PrivateRoute path="/profile" component={PersonalPage} />
        </Switch>
  )
};