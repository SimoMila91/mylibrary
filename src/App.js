import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { ContextProvider } from './context/Context';



export default function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Container disableGutters maxWidth="xl">
            <Navbar />
            <Main />
          </Container>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

