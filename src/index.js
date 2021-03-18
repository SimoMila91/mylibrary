import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'sans serif'
    ].join(','),
  },
  palette: {
    primary: green,
  }
});

const Index = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

