import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import {
  Container,
  Grid,
  makeStyles,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Paper,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Link,
  Menu,
  MenuItem,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import voidImg from '../../images/unDraw/void.svg';
import nofound from '../../images/unDraw/nofound.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Context
} from '../../context/Context';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto'
  },
  navStyle: {
    width: '100%'
  },
  navBorder: {
    borderRight: '1px solid #dfe0d7',
    [theme.breakpoints.down('sm')]: {
      borderBottom: '1px solid #dfe0d7'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  paperStyle: {
    width: 140,
    position: 'relative'
  },
  paperWidth: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column',
      textAlign: 'center'
    },
  },
  imgStyle: {
    height: 200,
    width: 140,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '3%',
    },
  },
  pad: {
    [theme.breakpoints.down('sm')]: {
      padding: '5% 3%'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 720
    },
    padding: '4% 2%'
  },
  voidImage: {
    [theme.breakpoints.up('xs')]: {
      height: 150
    },
    [theme.breakpoints.up('sm')]: {
      height: 300
    },
    [theme.breakpoints.up('md')]: {
      height: 400
    },
    [theme.breakpoints.up('lg')]: {
      height: 500
    },
    margin: 'auto'
  },
  voidDiv: {
    margin: '0 14%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      margin: '30px 6%'
    }
  },
  voidMessage: {
    [theme.breakpoints.up('xs')]: {
      fontSize: 25
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 35
    },
    margin: 'auto',
    fontFamily: 'fantasy',
    paddingLeft: '2%'
  },
  listSize: {
    fontSize: 15
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  notVisible: {
    display: 'none'
  },
  progressStyle: {
    margin: 'auto',
    color: '#000',
  },
  titleSize: {
    fontSize: 18,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '6%',
    },
  },
  searchStyle: {
    margin: 8,
    width: 300,
  },
  divSearch: {
    paddingLeft: '2%',
    paddingTop: '2%',
  },
  dialogButtons: {
    justifyContent: 'flex-end !important',
  },
  checkmoreButton: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: 5,
      right: 5
    },
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
    },
  },
  contentPaper: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: '10%'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
    }
  },
  linkStyle: {
    "&:hover": {
        textDecoration: 'none',
    },
  },
  padContents: {
    padding: '2%'
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

export default function PersonalPage() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const initialState = {
    open: false,
    title: '',
    author: '',
    idBook: '',
  };
  const [id, setId] = useState(-1);
  const [open, setOpen] = useState(initialState);
  const {
    snackOpenFun
  } = useContext(Context);

  const handleClose = () => {
    setOpen(initialState);
  };

  const request = useCallback(() => {
    const data = {
      idUser: localStorage.getItem('idUser'),
      index: selectedIndex
    };
    axios.get('https://my-library-backend-italy.herokuapp.com/read', {
      params: data
    }).then(res => {
      setBooks(res.data.ress);
      setResults(res.data.ress);
      setMessage(res.data.string);
    }).catch(err => console.log(err));
  }, [selectedIndex]);

  const handleListItemClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  useEffect(() => {
    request();
  }, [selectedIndex, handleListItemClick, request])

  const visible = books.length !== 0 ?
    null : {
      className: classes.notVisible
    };

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    const res = books.filter(o => o.title.toLowerCase().includes(input.toLowerCase().trim())
      || o.author.toLowerCase().includes(input.toLowerCase().trim())
      || o.genre.toLowerCase().includes(input.toLowerCase().trim()))
    ;
    setResults(res);
  }, [input, books]);

  const handleClickOpen = (i) => {
    setOpen({
      open: true,
      title: results[i].title,
      author: results[i].author,
      idBook: results[i].idBook,
    });
  };

  const handleDelete = () => {
    let request;
    if (selectedIndex === 0) {
      request = 'deleteBook';
    } else if (selectedIndex === 2 || selectedIndex === 1) {
      request = 'typeDefault';
    } else {
      request = 'updateFavorite';
    };
    const data = {
      idBook: open.idBook,
      idUser: localStorage.getItem('idUser'),
    };
    if (selectedIndex === 0) {
      axios.delete(`https://my-library-backend-italy.herokuapp.com/${request}`, {
        params: data
      }).then(res => {
        handleClose();
        snackOpenFun(res.data, 'success');
        request();
      }).catch(err => console.log(err));
    } else {
      axios.put(`https://my-library-backend-italy.herokuapp.com/${request}`, data)
        .then(res => {
          handleClose();
          snackOpenFun(res.data, 'success');
          request();
        }).catch(err => console.log(err));
    };
  };

  const handleChangeType = (e, i) => {
    setId(i);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    const payload = {
      idBook: results[id].idBook,
      type: e.currentTarget.textContent.slice(2),
      idUser: localStorage.getItem('idUser')
    };
    axios.put("https://my-library-backend-italy.herokuapp.com/updateType", payload)
    .then(res => {
      snackOpenFun(res.data, 'success');
      setAnchorEl(null);
      request();
    }).catch(err => console.log(err));
  };

  const menuId = 'primary-search-type-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} id={menuId} keepMounted transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} open={isMenuOpen} onClose={() => setAnchorEl(null)}
    >
    {
      selectedIndex === 1 ?
      <MenuItem onClick={handleMenuClose}>+ Read</MenuItem>
      : selectedIndex === 2 ?
      <MenuItem onClick={handleMenuClose}>+ To Read</MenuItem>
      :
      <div>
        <MenuItem onClick={handleMenuClose}>+ Read</MenuItem>
        <MenuItem onClick={handleMenuClose}>+ To Read</MenuItem>
      </div>
    }
    </Menu>
  );

  const preRender = () => {
    if (message !== '') {
      return (
        <div className={classes.voidDiv}>
            <img className={classes.voidImage} src={voidImg} alt="void"/>
            <Typography variant="h2" className={classes.voidMessage}>{message}</Typography>
          </div>
      )
    } else {
      return (
        <CircularProgress size={100} disableShrink className={classes.progressStyle} />
      )
    }
  };

  const renderDialog = () => {
    let finalText;
    if (selectedIndex === 1) {
      finalText = ' from your books to read';
    } else if (selectedIndex === 2) {
      finalText = ' from your read books';
    } else if (selectedIndex === 3) {
      finalText = ' from your favorites';
    } else {
      finalText = '';
    };
    return (
      <Dialog
        open={open.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{open.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <span style={{color: 'black'}}>{open.title}</span> of <span style={{color: 'black'}}>{open.author}</span>{finalText}?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogButtons}>
          <Button onClick={handleClose} color="primary" variant="contained">
            cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained" autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  return (
    <>
    <Container
      maxWidth = {false}
      disableGutters
      className = {classes.root}
    >
    <Grid container>
    <Grid item xs={12} md={3} lg={2} className={classes.navBorder}>
      <div className={classes.navStyle}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
            <ListItemIcon>
              <ClearAllIcon/>
            </ListItemIcon>
            <ListItemText primary="All my books"/>
          </ListItem>
          <ListItem button selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
            <ListItemIcon>
              <CheckCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Books read"/>
          </ListItem>
          <ListItem button selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
            <ListItemIcon>
              <CheckCircleOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary="Books to read"/>
          </ListItem>
          <ListItem button selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
            <ListItemIcon>
              <FavoriteIcon/>
            </ListItemIcon>
            <ListItemText primary="My favorites"/>
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item xs={12} md={9} lg={10}>
      <div className={classes.divSearch}>
        <TextField id="standard-full-width" label="Live search" className={classes.searchStyle} placeholder="Fast search" {...visible} value={input} onChange={handleChange} margin="normal" InputLabelProps={{
            shrink: true
          }} variant="outlined"/>
      </div>
      <Grid container spacing={4} className={classes.pad}>
        {
          results.length !== 0 || books.length !== 0
            ? results.map((book, i) => (
              <Grid item key={i} xs={12} lg={6} xl={3}>
                <Paper className={classes.paperStyle + " " + classes.paperWidth}>
                  <div>
                    <img className={classes.imgStyle} src={book.linkImage
                        ? book.linkImage
                        : `${voidImg}`} alt={book.title}
                    />
                  </div>
                  <div className={classes.deleteButton}>
                    <IconButton aria-label="add book" aria-controls={menuId} aria-haspopup="true" onClick={(e) => handleChangeType(e, i)} color="inherit" style={{paddingRight: 0}}>
                      <MoreVertIcon/>
                    </IconButton>
                    <IconButton onClick={e => handleClickOpen(i)} color="inherit">
                      <DeleteIcon/>
                    </IconButton>
                  </div>
                  <div className={classes.padContents}>
                    <Typography variant="h6" className={classes.titleSize} component="p">{truncateString(book.title, 21)}</Typography>
                      <div className={classes.contentPaper}>
                          <Typography component="p" variant="subtitle1" className={classes.listSize}>
                            <Typography component="span" display="inline" variant="subtitle2">Author: </Typography>
                            {
                              book.author
                                ? truncateString(book.author, 21)
                                : "Author anavailable"
                            }
                          </Typography>
                          <Typography component="p" variant="subtitle1" className={classes.listSize}>
                            <Typography component="span" display="inline" variant="subtitle2">Genre: </Typography>
                            {book.genre}
                          </Typography>
                          <Typography component="p" variant="subtitle1" className={classes.listSize}>
                            <Typography component="span" display="inline" variant="subtitle2">Published: </Typography>
                            {book.publish_date}
                          </Typography>
                        </div>
                  </div>
                  <div className={classes.checkmoreButton}>
                    <Button size="small" onClick={handleClose} color="primary" variant="outlined">
                      <Link
                          href={book.linkBuy ? book.linkBuy : null}
                          target="_blank"
                          className={classes.linkStyle}
                      >
                          Check more
                      </Link>
                    </Button>
                  </div>
                </Paper>
              </Grid>))
            : preRender()
        }
        {
          results.length === 0 && books.length !== 0
            ? <div className={classes.voidDiv}>
                <img className={classes.voidImage} src={nofound} alt="void"/>
                <Typography variant="h2" className={classes.voidMessage}>I can't find the book..</Typography>
              </div>
            : null
        }
        </Grid>
    </Grid>
  </Grid>
  {renderDialog()}
  </Container>
  {renderMenu}
  </>
  )
};
