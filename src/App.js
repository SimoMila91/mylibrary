import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Route/Main';
import SnackBar from './components/snackBar/SnackBar';
import { ContextProvider } from './context/Context';
import { NewsContextProvider } from './context/NewsContext';


export default function App() {



  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Container style={{ overflow: 'hidden' }} disableGutters maxWidth={false}>
            <Navbar />
            <NewsContextProvider>
              <Main />
            </NewsContextProvider> 
            <SnackBar />
          </Container>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

