import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = props => {

    const [books, setBooks] = useState([]);
    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('fiction');
    const [snackOpen, setSnackOpen] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const favoriteBooks = (i, e) => {
        e.preventDefault();
        if (favorite && i)
            setFavorite(false);
        else if (!favorite && i)
            setFavorite(true);
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
        setType(value);
    };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        setGenre(value);
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
                registered,
                reSetSnackbar,
                snackOpen,
                favorite,
                favoriteBooks,
                books,
                setBooks,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

