import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = props => {

    const [books, setBooks] = useState(JSON.parse(localStorage.getItem('books')) !== null ? JSON.parse(localStorage.getItem('books')) : []);
    const [age, setAge] = useState('');
    const [type, setType] = useState('paid-ebooks');
    const [genre, setGenre] = useState('fiction');
    const [snackOpen, setSnackOpen] = useState(false);
    const [filterGenre, setFilterGenre] = useState('');
    const [language, setLanguage] = useState('it');

    const handleFilterGenreChange = e => {
        const { value } = e.target;
        if (value !== '')
            setFilterGenre(value);
        else
            setFilterGenre('');
    };

    const handleChangeLang = (e) => {
        const { value } = e.target;
        setLanguage(value);
    };

    const registered = () => {
        setSnackOpen(true);
    };

    const reSetSnackbar = () => {
        setSnackOpen(false);
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

    if (books && books.length > 0) {
        localStorage.setItem('books', JSON.stringify(books));
    } else {
        console.log('non ci sono libri');
    }

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
                registered,
                reSetSnackbar,
                snackOpen,
                books,
                setBooks,
                filterGenre,
                handleFilterGenreChange,
                language,
                handleChangeLang
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

