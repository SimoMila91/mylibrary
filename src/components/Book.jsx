import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import googleBook from '../api/googleBook';
import SearchBar from './SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import BookList from './book/BookList';
import { Context } from '../context/Context';


const useStyles = makeStyles((theme) => ({
    searchStyle: {
        padding: '4%'
    },
}));


export default function Book() {
    const classes = useStyles();
    const { type, age, books, setBooks, filterGenre, language } = useContext(Context);

    let typeChange = type !== '' && filterGenre === '' ? `&filter=${type}` : '';


    const onTermSubmit = async (term) => {
        const response = await googleBook.get(`/books/v1/volumes?q=${term}&langRestrict=${language}&maxResults=40${typeChange}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        if (response.data.items !== undefined) {
            setBooks(response.data.items);
        } else
            console.log("non ci sono risultati");
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
            <BookList books={books.sort(sortFunction)} />
        </React.Fragment>
    );
};
