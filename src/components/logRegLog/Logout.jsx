import React, {
  useContext
} from 'react';
import axios from 'axios';
import {
  Redirect
} from 'react-router-dom';
import {
  Context
} from '../../context/Context';

export default function Logout() {
  const {
    renderButton,
    setBooks,
    snackOpenFun
  } = useContext(Context);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('username');

  const payload = {
    token
  };

  const timeOfDay = () => {
    let hour = new Date().getHours();
    if (hour >= 4 && hour <= 11) return 'morning';
    if (hour >= 12 && hour <= 16) return 'afternoon';
    if (hour >= 17 && hour <= 20) return 'evening';
    if (hour >= 21 || hour <= 3) return 'night';
  };

  axios.post("https://my-library-backend-italy.herokuapp.com/logout", payload)
    .then(res => {
      snackOpenFun(`See you soon ${name}. Good ${timeOfDay()}`, 'success');
      localStorage.clear();
      setBooks([]);
      renderButton();
    }).catch(err => {
      console.warn(err);
    });

  return (
    <Redirect to="/" />
  )
}