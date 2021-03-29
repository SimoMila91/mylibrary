import React from 'react';
import { Grid, Paper, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    article: {
        padding: 10,
        textAlign: 'center',
        lineHeight: 1.8,
    },
}));

export default function NewsArticle({news}) {
    const classes = useStyles();
    return (
        <Grid key={news.url} item xs={12} sm={6} md={4}>
            <Grid item style={{height: '100%'}}>
                <Paper style={{height: 'inherit'}} className={classes.article} elevation={6}>
                    <Typography style={{ marginTop: 10, minHeight: '4rem' }} variant="h6">{news.title}</Typography>
                    <br />
                    <Card>
                        <CardMedia style={{ height: 0, paddingTop: '56%' }} image={news.urlToImage} />
                    </Card>
                    <p style={{ marginTop: '3%', padding: 12 }}>{news.content}</p>
                    <p style={{padding: '0 12px'}}><em>Read more here</em> <a href={news.url} targer="_blank"><em>{news.source.name}</em></a></p>
                </Paper>
            </Grid>
        </Grid>
    )
}