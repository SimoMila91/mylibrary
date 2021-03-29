import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function PrivateRoute({component, path}) {

    const { handleOpenForm, snackOpenFun } = useContext(Context);

    const token = localStorage.getItem('token');

    if (token) {
        return ( <Route path={path} component={component} /> );
    } else {
        snackOpenFun('You need to login first', 'info');
        handleOpenForm();
        return ( <Redirect to="/" /> );
    };
};