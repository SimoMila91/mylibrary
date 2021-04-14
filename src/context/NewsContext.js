import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsContextProvider = props => {
    const [article, setArticle] = useState();

    useEffect(() => {
        axios.post("https://my-library-backend-italy.herokuapp.com/articles")
        .then(res => {
            // filter results in order to delete multiple and equal books
            const response = res.data.articles;
            const ress = res.data.articles;
            for (let i = 0; i < response.length-1; i++) {
                for (let k = i; k < response.length; k++) {
                    let modifyStringTwo = response[k].link.includes('https') ? response[k].link : response[k].link.replace('http', 'https');
                    let modifyString = response[i].link.includes('https') ? response[i].link : response[i].link.replace('http', 'https');
                    if (response[i].title === response[k].title || modifyString === modifyStringTwo || response[i].summary === response[k].summary) {
                        ress.splice(k, 1);
                    }
                }
            }
            setArticle(ress);
            localStorage.setItem('articles', JSON.stringify(ress));
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