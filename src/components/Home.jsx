import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import googleBook from '../api/googleBook';
import HomeProgress from './home/HomeProgress';
import { Paper, Grid, Container, Typography, Button, Divider} from '@material-ui/core';
import { Context } from '../context/Context';
import { NewsContext } from '../context/NewsContext';
import NewsArticle from './home/NewsArticles';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        color: '#494949',
        marginTop: '4%',
    },
    title: {
        [theme.breakpoints.up('xs')]: {
            fontSize: 20,
        },
        padding: '1.4%',
    },
}));


export default function Home(props) {
    const classes = useStyles();
    const { genre } = useContext(Context);
    const { article } = useContext(NewsContext);
    const [news, setNews] = useState([]);

    const termSort = (term) => {
        googleBook.get(`/books/v1/volumes?q=subject:${term}&maxResults=10&orderBy=newest&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => {
                setNews(res.data.items);
            })
            .catch(err => console.warn(err));
    };

    useEffect((genre) => {
        termSort(genre);
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [genre]);

    useEffect(() => {
        termSort(genre);
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [genre])

    console.log(article);
    return (
        <>
            <Container style={{ paddingTop: '4%', textAlign: 'center' }} maxWidth="lg">
                <Paper style={{ marginBottom: '2%', }} >
                    <Typography className={classes.title}>News and Reviews from the World of Books!</Typography>
                </Paper>
                <Grid container spacing={2}>
                    {
                        article ? article.articles.slice(0, 6).map((news) => <NewsArticle news={news} /> )
                        : 
                        <p>Loading</p>                   
                    }
                </Grid>
                <Button style={{margin: '3% 0'}} variant="contained" color="inherit">
                    <NavLink to="/article" style={{textDecoration: 'none'}}>check more articles</NavLink>
                </Button>
            </Container>
            <Divider />
            <div className={classes.root}>
                 <HomeProgress news={news} />
            </div>
        </>
    )
}