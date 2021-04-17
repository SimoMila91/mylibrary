import React, {
  useContext
} from 'react';
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  makeStyles,
  Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import ImageNotFound from '../../images/imageNotFound.svg';
import {
  Context
} from '../../context/Context';
import Reviews from '../book/Reviews';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  titleMobile: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 19,
      marginRight: '4%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      textAlign: 'center',
      margin: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 24,
    },
  },
  padTitle: {
    paddingRight: '3%',
  },
  respImg: {
    [theme.breakpoints.up('xs')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
    },
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    [theme.breakpoints.up('lg')]: {
      width: 230,
    },
  },
  firstSecMobile: {
    textAlign: 'initial',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 20,
      display: 'flex',
    },
  },
  mainInfo: {
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      marginLeft: 'inherit',
    },
  },
  divider: {
    marginTop: '5%',
  },
}));

export default function BookFocus({
  onClose,
  onOpen,
  id
}) {
  const classes = useStyles();

  const {
    books
  } = useContext(Context);

  const renderDialog = () => {
    if (books.length > 0) {
      const book = books[id];
      return (
        <>
                    <Dialog
                      maxWidth="lg"
                      fullWidth={true}
                      open={onOpen}
                    >
                        <DialogTitle disableTypography>
                          <div className={classes.padTitle}>
                            <Typography className={classes.titleMobile} variant="h4">
                              {book.volumeInfo.title}
                            </Typography>
                          </div>
                          <IconButton className={classes.closeButton} aria-label="close" onClick={onClose}>
                            <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <div className={classes.firstSecMobile}>
                                <img className={classes.respImg} src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : `${ImageNotFound}`} alt="bookImage" />
                                <div className={classes.mainInfo}>
                                    <ul style={{ display: 'grid' }}>
                                        <li>{book.volumeInfo.authors !== undefined ? book.volumeInfo.authors.join(' - ') : <em style={{ color: 'grey' }}>Author anavailable</em>}</li>
                                        <li>{book.volumeInfo.categories !== undefined ? "Genre - " + book.volumeInfo.categories : <em style={{ color: 'grey' }}>Genre anavailable</em> }</li>
                                        {book.volumeInfo.publisher ? <li> {book.volumeInfo.publisher} </li> : null}
                                        <li>{book.volumeInfo.publishedDate !== undefined ? book.volumeInfo.publishedDate.slice(0, 4) : "0000"}</li>
                                        <li>
                                            List price: {book.saleInfo.saleability === 'FOR_SALE' ?
                                                <>
                                                    <span style={{ color: 'green', fontFamily: 'sans-serif' }}>
                                                        {book.saleInfo.listPrice.amount}
                                                    </span> {book.saleInfo.listPrice.currencyCode}
                                                </> : <em style={{ color: 'grey' }}>not available</em>}
                                        </li>
                                        <li>
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Rating
                                                    name="read-only"
                                                    value={book.volumeInfo.averageRating}
                                                    readOnly
                                                />
                                            </Box>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                {book.volumeInfo.description ? <><Typography style={{ lineHeight: 2 }}> {book.volumeInfo.description}</Typography></> : null}
                            </div>
                            <div>
                            {
                                book.accessInfo.epub.isAvailable || book.accessInfo.pdf.isAvailable ?
                                <div>
                                    <ul style={{ display: 'grid' }}>
                                        {
                                            book.accessInfo.epub.isAvailable && book.accessInfo.epub.acsTokenLink ?
                                            <li style={{ marginLeft: 0, color: 'green', marginBottom: 0 }}>FREE EPUB:
                                                <a style={{ textDecoration: 'none' }} href={book.accessInfo.epub.acsTokenLink}> Download</a>
                                            </li> : null
                                        }
                                        {
                                            book.accessInfo.pdf.isAvailable && book.accessInfo.pdf.acsTokenLink ?
                                            <li style={{ marginLeft: 0, color: 'green', marginBottom: 0 }}>FREE PDF:
                                                <a style={{ textDecoration: 'none' }} href={book.accessInfo.pdf.acsTokenLink}> Download</a>
                                            </li>
                                            : null
                                        }
                                    </ul>
                                </div> : null
                            }
                            </div>
                            <Divider className={classes.divider} />
                            <Reviews id={id} />
                        </DialogContent>
                        <DialogActions>
                            {book.saleInfo.saleability === 'FOR_SALE' ?
                                <a style={{ textDecoration: 'none' }} rel="noreferrer" target="_blank" href={book.saleInfo.buyLink}>
                                    <Button variant="contained" autoFocus color="primary">
                                        buy
                                    </Button>
                                </a> : null
                            }
                            <a style={{ textDecoration: 'none' }} href={book.volumeInfo.previewLink} rel="noreferrer" target="_blank">
                                <Button variant="outlined" autoFocus color="primary">
                                    see previews
                                </Button>
                            </a>
                        </DialogActions>
                    </Dialog>
                </>
      )
    }
  };

  return (
    <React.Fragment>
            {renderDialog()}
        </React.Fragment>
  )
}
