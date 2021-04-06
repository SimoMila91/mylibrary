import React, { useContext } from 'react';
import { Card, CardActionArea, Typography, makeStyles,
    CardActions, CardContent, CardMedia, Button, Grid, Container
} from '@material-ui/core';
import { NewsContext } from '../../context/NewsContext';
import noImage from '../../images/noImageArticle.jpg';

const font = "'Luckiest Guy', cursive";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
    height: '33rem',
  },
  containerStyle: {
    padding: '3% 1%',
  },
  backgroundTitle: {
      display: 'flex',
      height: '10rem',
      flex: 1,
  }, 
  title: {
      margin: 'auto',
      marginTop: '3%',
      fontFamily: font,
      textTransform: 'uppercase',
      fontSize: 82,
      fontWeight: 400,
  },
  itemStyle: {
    height: '100%', 
    position: 'relative',
  },
  articleTitle: {
    fontSize: '1.3rem',
  },
  buttonPos: {
      position: 'absolute',
      bottom: 3,
  }
});

const truncateString = (str, n) => { return (str.length > n) ? <>{str.substr(0, n - 1)} ...</> : str;};

//const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const addDefaultSrc = (ev) => {
    ev.target.src = `${noImage}`;
};

export default function ArticleList() {
    const classes = useStyles();
    const { article }  = useContext(NewsContext);

    return (
        <>
            <div className={classes.backgroundTitle}>
            <h1 className={classes.title}>. Articles .</h1>
            </div>
            <Container className={classes.containerStyle} maxWidth='lg'>
                <Grid container spacing={4}>
                    {
                    article ? article.map((news, i) => (
                        <Grid key={i} item xs={12} md={4}>
                                <Grid className={classes.itemStyle} item>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image={news.media ? news.media : news.media_content || `${noImage}`}
                                                onError={addDefaultSrc}
                                                title={news.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" className={classes.articleTitle} component="h2">
                                                {truncateString(news.title, 52)}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="span">
                                                {truncateString(news.summary, 450)}
                                                </Typography>
                                                
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className={classes.buttonPos}>
                                            <Typography variant="subtitle2" color="textSecondary" component="span">
                                                ✍️: <em style={{color: '#000'}}>{news.author ? news.author : news.clean_url}</em>
                                            </Typography>
                                            <Button size="small">
                                            <a style={{textDecoration: 'none'}} target="_blank" rel="noreferrer" href={news.link}>READ MORE</a>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                </Grid>
                        )) : null
                    }
                </Grid>
            </Container>
        </>
    );
};