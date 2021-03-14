import React from 'react';
import notFoundImage from '../images/imageNotFound.svg';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        width: '90%',
        margin: 'auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',

    },
    cover: {
        minWidth: '150px',
        maxHeight: '180px'
    },
    titleSize: {
        fontSize: '17px'
    }
}));

export default function BookList({ books }) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                {books.map((book, i) => (
                    <Grid style={{ display: 'flex' }} key={i} item xs={12} sm={6} md={6} lg={4}>
                        <Card className={classes.root} >
                            <img className={classes.cover}
                                src={book.volumeInfo.imageLinks === undefined ? `${notFoundImage}`
                                    : `${book.volumeInfo.imageLinks.thumbnail}`}
                                alt={book.volumeInfo.title}
                            />
                            <div className={classes.details}>
                                <CardContent>
                                    <Typography component="h5" className={classes.titleSize}>
                                        {book.volumeInfo.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {book.volumeInfo.authors !== undefined ? book.volumeInfo.authors : "Author anavailable"}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Publish Date: {book.volumeInfo.publishedDate !== undefined ? book.volumeInfo.publishedDate.slice(0, 4) : "0000"}
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}