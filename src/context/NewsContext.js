import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsContextProvider = props => {
    const [article, setArticle] = useState();

    useEffect(() => {
        axios.get("https://newsapi.org/v2/everything?q=libri-da-leggere&language=it&sortBy=popularity&apiKey=c8da4df76372421ca59a9dbc2d7d16ef")
        .then(res => {
            setArticle(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <NewsContext.Provider value={{article}}>
            {props.children}
        </NewsContext.Provider>
    );
};