import React, { useState, createContext } from 'react';

export const Context = createContext();
export const ContextProvider = props => {

    const [books, setBooks] = useState(JSON.parse(localStorage.getItem('books')) !== null ? JSON.parse(localStorage.getItem('books')) : []);
    const [age, setAge] = useState('');
    const [type, setType] = useState('paid-ebooks');
    const [genre, setGenre] = useState('fiction');
    const [open, setOpen] = useState(false);
    const initialState = {
        open: false,
        message: '',
        type: '',
    };
    const [snackOpen, setSnackOpen] = useState(initialState);
    const [filterGenre, setFilterGenre] = useState('');
    const [language, setLanguage] = useState('it');
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
    const [selectedForm, setForm] = useState('Login');

    const handleFilterGenreChange = e => {
        const { value } = e.target;
        if (value !== '')
            setFilterGenre(value);
        else
            setFilterGenre('');
    };

    const handleOpenForm = () => {
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
    };

    const handleChangeLang = (e) => {
        const { value } = e.target;
        setLanguage(value);
    };

    const snackOpenFun = (m, t) => {
        setSnackOpen({
            open: true,
            message: m,
            type: t,
        });
    };

    const reSetSnackbar = () => {
        setSnackOpen(initialState);
    };

    const handleChangeAge = (age) => {
        setAge(age);
    };

    const handleChangeType = (e) => {
        const { value } = e.target;
        if (value !== '')
            setType(value);
        else
            setType('paid-ebooks');
    };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        setGenre(value);
    };

    const saveBooks = () => {
        if (books && books.length > 0) {
            localStorage.setItem('books', JSON.stringify(books));
        }
    };

    saveBooks();


    const renderButton = () => {
        if (loggedIn)
            setLoggedIn(null);
        else
            setLoggedIn(true);
    };

    return (
        <Context.Provider
            value={{
                handleChangeAge,
                handleChangeType,
                age,
                setAge,
                type,
                setType,
                genre,
                handleGenreChange,
                setGenre,
                snackOpenFun,
                reSetSnackbar,
                snackOpen,
                books,
                setBooks,
                filterGenre,
                handleFilterGenreChange,
                language,
                handleChangeLang,
                loggedIn,
                renderButton,
                handleOpenForm,
                open,
                handleCloseForm,
                selectedForm,
                setForm
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
