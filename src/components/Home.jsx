import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeProgress from './home/HomeProgress';
import { Paper, Grid, Container, Typography, Button, Divider} from '@material-ui/core';
import { Context } from '../context/Context';
import { NewsContext } from '../context/NewsContext';
import NewsArticle from './home/NewsArticles';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '4%', 
        textAlign: 'center', 
    },
    newBook: {
        width: 'auto',
        color: '#494949',
        margin: '4% 0',
    },
    title: {
        [theme.breakpoints.up('xs')]: {
            fontSize: 20,
        },
        padding: '1.4%',
    },
    marginTitle: {
        marginBottom: '2%',
    },
    marginButton: {
        margin: '9% 0',
        color: '#007bff',
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const { genre } = useContext(Context);
    const { article } = useContext(NewsContext);
    const [news, setNews] = useState([]);

    const termSort = async (term) => {
        const payload = { term: term };
        const response = await axios.post("http://localhost:3000/newbook", payload);
        if (response.data !== undefined) {
            setNews(response.data);
        } else {
            console.log("error");
        }
    };

    useEffect((genre) => {
        termSort(genre);
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [genre]);

    useEffect(() => {
        termSort(genre);
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [genre])

    return (
        <>
            <Container className={classes.root} maxWidth="lg">
                <Paper className={classes.marginTitle}>
                    <Typography className={classes.title}>News and Reviews from the World of Books!</Typography>
                </Paper>
                <Grid container spacing={2}>
                    {
                        article ? article.slice(0, 6).map((news, i) => <NewsArticle news={news} key={i} /> )
                        : 
                        <p>Loading</p>                   
                    }
                </Grid>
                <Button component={NavLink} to="/articles" className={classes.marginButton} variant="contained" color="inherit">
                    check more articles
                </Button>
            </Container>
            <Divider />
            <Container maxWidth={false} className={classes.newBook}>
               {
                   news ? <HomeProgress news={news} /> : <p>Loading..</p>
               }
            </Container>
        </>
    )
}