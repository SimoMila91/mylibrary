import React from 'react';
import { Grid, Paper, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import noImage from '../../images/noImageArticle.jpg';

const useStyles = makeStyles((theme) => ({
    article: {
        padding: 10,
        textAlign: 'center',
        lineHeight: 1.8,
    },
    fontStyle: {
        marginTop: 10, 
    },
    maxHeight: {
        height: '100%',
    },
    content: {
        marginTop: '3%', 
        padding: 12,
    },
    linkMore: {
        padding: '0 12px',
    },
}));

const addSrcImage = e => {
    e.target.src = `${noImage}`;
};

export default function NewsArticle({news}) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Grid item className={classes.maxHeight}>
                <Paper className={classes.article} elevation={6}>
                    <Typography className={classes.fontStyle} variant="h6">{news.title}</Typography>
                    <br />
                    <Card>
                        <CardMedia onError={addSrcImage} style={{ height: 0, paddingTop: '56%' }} image={news.media ? news.media : `${noImage}`} />
                    </Card>
                    <p className={classes.content}>{news.summary}</p>
                    <p className={classes.linkMore}><em>Read more here</em> <a href={news.link} targer="_blank"><em>{news.clean_url}</em></a></p>
                </Paper>
            </Grid>
        </Grid>
    )
}