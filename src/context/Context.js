import React, { useState } from 'react';

export const Context = React.createContext();
export const ContextProvider = props => {

    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [genre, setGenre] = useState('fiction');

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
                setGenre
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

