import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

const font = "'Raleway', sans serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#007bff',
    }
  }
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.clear();
  }
  throw error;
});

const Index = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

