import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import BookList from './book/BookList';
import { Context } from '../context/Context';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    searchStyle: {
        padding: '4%'
    },
}));


export default function Book() {
    const classes = useStyles();
    const { type, age, books, setBooks, filterGenre, language } = useContext(Context);

    let typeChange = type !== '' && filterGenre === '' ? type : '';


    const onTermSubmit = async (term) => {
      let id = localStorage.getItem('idUser');
        const payload = {
            term: term,
            language: language,
            typeChange: typeChange,
            idUser: id
        };
        const response = await axios.post("https://my-library-backend-italy.herokuapp.com/books", payload);
        console.log(response);
        if (response.status === 200) {
            setBooks(response.data);
            localStorage.setItem('term', term);
        };
    };

    const sortFunction = (a, b) => {
        if (b.volumeInfo.publishedDate !== undefined && a.volumeInfo.publishedDate !== undefined) {
            if (age === "Newest") {
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
            } else if (age === "Oldest") {
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
            }
        }
    };


    return (
        <React.Fragment>
            <Container className={classes.searchStyle}>
                <SearchBar onFormSubmit={onTermSubmit} />
            </Container>
            <BookList onTermSubmit={onTermSubmit} books={books.sort(sortFunction)} />
        </React.Fragment>
    );
};
