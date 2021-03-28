import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import googleBook from '../api/googleBook';
import HomeProgress from './home/HomeProgress';
import { Paper, Grid, Container, Card, Typography, CardMedia} from '@material-ui/core';
import { Context } from '../context/Context';
import harryPotter from '../images/harryPotter.jpg';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        color: '#494949',
        marginTop: '4%',
    },
    article: {
        padding: 10,
        textAlign: 'center',
        lineHeight: 1.8,
    },
    title: {
        [theme.breakpoints.up('xs')]: {
            fontSize: 20,
        },
        padding: '1.4%',
    },
}));


export default function Home() {
    const classes = useStyles();
    const { genre } = useContext(Context);
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

    return (
        <>
            <Container style={{ paddingTop: '4%' }} maxWidth="lg">
                <Paper style={{ marginBottom: '2%', }} >
                    <Typography className={classes.title}>News and Reviews from the World of Books!</Typography>
                </Paper>
                <Grid container spacing={2}>
                    {[0, 1, 2].map((value) => (
                        <Grid key={value} item xs={12} sm={6} md={4}>
                            <Grid item>
                                <Paper className={classes.article} elevation={6}>
                                    <Typography style={{ marginTop: 10 }} variant="h5">Harry Potter is a Bestseller</Typography>
                                    <br />
                                    <Card>
                                        <CardMedia style={{ height: 0, paddingTop: '66%' }} image={harryPotter} />
                                    </Card>

                                    <p style={{ marginTop: '3%', textAlign: 'left', padding: 12 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint commodi reprehenderit dolor totam
                                    ipsam possimus iusto quaerat ratione, doloribus
                                    nesciunt corporis quos tempore eum molestias explicabo repudiandae aperiam quae consectetur.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint commodi reprehenderit dolor totam
                                    ipsam possimus iusto quaerat ratione, doloribus.
                                        <br /><span style={{ fontSize: 20 }}>...more</span></p>
                                </Paper>
                            </Grid>
                        </Grid>
                    ))}

                </Grid>
            </Container>
            <div className={classes.root}>
                 <HomeProgress news={news} />
            </div>
        </>
    )
}