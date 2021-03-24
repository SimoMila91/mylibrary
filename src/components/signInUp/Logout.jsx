import React, { useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Logout() {
    const { renderButton } = useContext(Context);
    const token = localStorage.getItem('token');

    const payload = {
        token
    };

    axios.post("http://localhost:3000/logout", payload)
        .then(res => {
            console.log(res.data);
            localStorage.clear();
            renderButton();
        }).catch(err => {
            console.warn(err);
        });

    return (
        <Redirect to="/" />
    )
}