import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {
  Container
} from '@material-ui/core';
import {
  BrowserRouter
} from 'react-router-dom';
import Main from './components/Route/Main';
import Footer from './components/Footer';
import SnackBar from './components/snackBar/SnackBar';
import {
  ContextProvider
} from './context/Context';
import {
  NewsContextProvider
} from './context/NewsContext';


export default function App() {



  return (
    <div className="App">
    <BrowserRouter>
      <ContextProvider>
        <Container style={{ overflow: 'hidden' }} disableGutters maxWidth={false}>
          <Navbar />
          <NewsContextProvider>
            <Main />
          </NewsContextProvider>
          <SnackBar />
        </Container>
        <Footer />
      </ContextProvider>
      </BrowserRouter>
    </div>
  );
}