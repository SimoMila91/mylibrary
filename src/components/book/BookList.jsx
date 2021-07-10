import React, {
  useState,
  useContext
} from 'react';
import notFoundImage from '../../images/unDraw/void.svg';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Menu,
  MenuItem,
  IconButton,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Context
} from '../../context/Context';
import BookFocus from './BookFocus';
import insertBook from '../usersRoutes/InsertBook';
import favoriteBook from '../usersRoutes/FavoriteBook';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import know from '../../images/unDraw/readbook.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column'
    },
    display: 'flex',
    width: '90%',
    margin: 'auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  },
  cover: {
    minWidth: 130,
    maxWidth: 130,
    minHeight: 200,
    maxHeight: 200,
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      marginTop: 10
    }
  },
  textCenter: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  titleSize: {
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      fontSize: 18
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 19,
      width: '23rem'
    }
  },
  buttons: {
    textAlign: 'center',
    margin: 10,
    [theme.breakpoints.up('sm')]: {
      marginTop: 'auto',
      textAlign: 'end'
    }
  },
  iconStar: {
    position: 'absolute',
    right: 7,
    top: 2,
    [theme.breakpoints.down('xs')]: {
      top: -200
    },
    display: 'flex',
    flexFlow: 'column'
  },
  mobile: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: '1rem',
      textAlign: 'inherit'
    }
  },
  gridStyle: {
    display: 'flex'
  },
  searchDiv: {
    height: 300,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  knowImg: {
    margin: 'auto',
    height: 300,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: 150
    }
  }
}));

const truncateString = (str, n) => {
  return (str.length > n) ?
    <> {
      str.substr(0, n - 1)
    }
    ...</> :
    str;
};

export default function BookList({
  books,
  onTermSubmit
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const {
    handleOpenForm,
    loggedIn,
    snackOpenFun
  } = useContext(Context);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenDetails = (id) => {
    setOpenDetails(true);
    setId(id);
    console.log(books[id]);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleProfileMenuOpen = (event, i) => {
    setId(i);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    if (loggedIn) {
      const book = books[id];
      const payload = {
        idBook: book.id,
        title: book.volumeInfo.title.replaceAll("'", "''"),
        author: book.volumeInfo.authors ?
          book.volumeInfo.authors : null,
        plot: book.volumeInfo.description ?
          book.volumeInfo.description.replaceAll("'", "''") : null,
        linkImage: book.volumeInfo.imageLinks.thumbnail ?
          book.volumeInfo.imageLinks.thumbnail : null,
        linkBuy: book.saleInfo.saleability === 'FOR_SALE' ?
          book.saleInfo.buyLink : null,
        linkPdf: book.accessInfo.pdf.isAvailable && book.accessInfo.pdf.acsTokenLink ?
          book.accessInfo.pdf.acsTokenLink : null,
        linkEpub: book.accessInfo.epub.isAvailable && book.accessInfo.epub.acsTokenLink ?
          book.accessInfo.epub.acsTokenLink : null,
        linkPreview: book.volumeInfo.previewLink,
        genre: book.volumeInfo.categories,
        publish_date: book.volumeInfo.publishedDate !== undefined ?
          book.volumeInfo.publishedDate.slice(0, 4) : '0000',
        type: e.currentTarget.textContent.slice(2),
        idUser: localStorage.getItem('idUser')
      };
      insertBook(payload, snackOpenFun);
    } else {
      handleOpenForm();
      snackOpenFun('You need to login first', 'info');
    }
    setAnchorEl(null);
  };

 
  const favoriteCall = (e, i) => {
    if (loggedIn) {
      let value = e.target.getAttribute("value");
      if (value === null) {
        value = 0; 
      };
      console.log(value);
      const parse = parseInt(value);
      const book = books[i];
      console.log(book);
      const payload = {
        idBook: book.id,
        title: book.volumeInfo.title.replaceAll("'", "''"),
        author: book.volumeInfo.authors ?
          book.volumeInfo.authors : null,
        plot: book.volumeInfo.description ?
          book.volumeInfo.description.replaceAll("'", "''") : null,
        linkImage: book.volumeInfo.imageLinks.thumbnail ?
          book.volumeInfo.imageLinks.thumbnail : null,
        linkBuy: book.saleInfo.saleability === 'FOR_SALE' ?
          book.saleInfo.buyLink : null,
        linkPdf: book.accessInfo.pdf.isAvailable && book.accessInfo.pdf.acsTokenLink ?
          book.accessInfo.pdf.acsTokenLink : null,
        linkEpub: book.accessInfo.epub.isAvailable && book.accessInfo.epub.acsTokenLink ?
          book.accessInfo.epub.acsTokenLink : null,
        linkPreview: book.volumeInfo.previewLink,
        genre: book.volumeInfo.categories,
        publish_date: book.volumeInfo.publishedDate !== undefined ?
          book.volumeInfo.publishedDate.slice(0, 4) : '0000',
        idUser: localStorage.getItem('idUser'),
        favorite: parse
      };
      favoriteBook(payload, snackOpenFun);
      const term = localStorage.getItem('term');
      onTermSubmit(term);
    } else {
      handleOpenForm();
      snackOpenFun('You need to login first', 'info');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} id={menuId} keepMounted transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} open={isMenuOpen} onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={handleMenuClose}>+ Read</MenuItem>
      <MenuItem onClick={handleMenuClose}>+ To read</MenuItem>
    </Menu>
  );

  return (<React.Fragment>
    <Grid container spacing={4} style={{
        padding: '0px 2% 6% 2%'
      }}>
      {
        books.length !== 0
          ? books.map((book, i) => (<Grid className={classes.gridStyle} key={i} item xs={12} md={12} lg={6} xl={4}>
            <Card className={classes.root}>
              <img className={classes.cover} src={book.volumeInfo.imageLinks === undefined
                  ? `${notFoundImage}`
                  : `${book.volumeInfo.imageLinks.thumbnail.replace('http', 'https')}`} alt={book.volumeInfo.title}/>
              <div className={classes.details}>
                <CardContent>
                  <div className={classes.iconStar}>
                    <IconButton edge="end" aria-label="add book" aria-controls={menuId} aria-haspopup="true" onClick={(e) => handleProfileMenuOpen(e, i)} color="inherit">
                      <MoreVertIcon/>
                    </IconButton>
                    <IconButton edge="end" onClick={e => favoriteCall(e, i)}>
                      {
                        book.favorite === true 
                          ? <FavoriteIcon value={0} />
                          : <FavoriteBorderIcon value={1} />
                      }
                    </IconButton>
                  </div>
                  <Typography variant="h6" className={classes.titleSize + ` ` + classes.textCenter}>
                    {truncateString(book.volumeInfo.title, 80)}
                  </Typography>
                  <div className={classes.mobile}>
                    <Typography component="p" variant="subtitle1" color="textSecondary" style={{
                        marginTop: 10,
                        lineHeight: 'inherit'
                      }}>
                      <Typography component="span" variant="subtitle2" display="inline" color="textPrimary">Author:
                      </Typography>
                      {
                        book.volumeInfo.authors !== undefined
                          ? " " + truncateString(book.volumeInfo.authors.join(' - '), 30)
                          : " Author anavailable"
                      }
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                      {
                        book.volumeInfo.publisher
                          ? <Typography component="span" variant="subtitle2" display="inline" color="textPrimary">Publisher:
                            </Typography>
                          : ''
                      }
                      {book.volumeInfo.publisher ?  " " + book.volumeInfo.publisher : null}
                    </Typography>
                    <Typography component="p" variant="subtitle2" color="textSecondary">
                      <Typography component="span" variant="subtitle2" display="inline" color="textPrimary">Publish Date:
                      </Typography>
                      {
                        book.volumeInfo.publishedDate !== undefined
                          ? " " + book.volumeInfo.publishedDate.slice(0, 4)
                          : " 0000"
                      }
                    </Typography>
                  </div>
                </CardContent>
                <div className={classes.buttons}>
                  <Button onClick={() => handleOpenDetails(i)} color="primary" size="small" variant="outlined">check more</Button>
                </div>
              </div>
            </Card>
          </Grid>))
          : <div className={classes.searchDiv}>
              <img className={classes.knowImg} src={know} alt="knowledge"/>
            </div>
      }
    </Grid>
    {renderMenu}
    <BookFocus id={id} onOpen={openDetails} onClose={handleCloseDetails}/>
  </React.Fragment>)
}
