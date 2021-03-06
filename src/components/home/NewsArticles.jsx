import React from 'react';
import {
  Grid,
  Paper,
  Card,
  CardMedia,
  Typography,
  makeStyles
} from '@material-ui/core';
import noImage from '../../images/noImageArticle.jpg';

const useStyles = makeStyles((theme) => ({
  article: {
    padding: 10,
    textAlign: 'center',
    lineHeight: 1.8,
    height: '100%',
    position: 'relative',
  },
  fontStyle: {
    marginTop: 10,
    fontSize: 18
  },
  maxHeight: {
    height: '100%',
  },
  content: {
    marginTop: '3%',
    padding: 12,
    marginBottom: '3rem',
  },
  linkMore: {
    padding: '0 12px',
    position: 'absolute',
    bottom: 0,
    right: 20,
    left: 20,
  },
  mediaStyle: {
    height: 0,
    paddingTop: '56%'
  }
}));

const addSrcImage = e => {
  e.target.src = `${noImage}`;
};

const check = (media) => {
  if (media.includes('daytondailynews')) {
    return `${noImage}`;
  } else {
    return media;
  }
};

export default function NewsArticle({
  news
}) {
  const classes = useStyles();

  const truncateString = (str, n) => {
    return (str.length > n) ? <>{str.substr(0, n - 1)} ...</> : str;
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
            <Grid item className={classes.maxHeight}>
                <Paper className={classes.article} elevation={6}>
                    <Typography className={classes.fontStyle} variant="h6">{news.title}</Typography>
                    <br />
                    <Card>
                        <CardMedia onError={addSrcImage} className={classes.mediaStyle} image={news.media ? check(news.media) : `${noImage}` } />
                    </Card>
                    <p className={classes.content}>{truncateString(news.summary, 400)}</p>
                    <p className={classes.linkMore}><em>Read more here</em> <a href={news.link} targer="_blank"><em>{news.clean_url}</em></a></p>
                </Paper>
            </Grid>
        </Grid>
  )
}
