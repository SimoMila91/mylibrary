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
    height: 200,
    width: 140,
    position: 'relative'
  },
  paperWidth: {
    width: 250,
    padding: '1%',
    paddingTop: '2%'
  },
  imgStyle: {
    height: 200,
    width: 140
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
  gridPaper: {
    justifyContent: 'center',
    display: 'flex',
    position: 'relative'
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
    position: 'absolute',
    bottom: 5,
    right: 5,
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
    axios.get('http://localhost:3000/read', {
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
    const res = books.filter(o => o.title.toLowerCase().includes(input));
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
    const data = {
      idBook: open.idBook,
      idUser: localStorage.getItem('idUser'),
    };
    axios.delete("http://localhost:3000/deleteBook", {
      params: data
    }).then(res => {
      snackOpenFun(res.data, 'success');
      handleClose();
      request();
    }).catch(err => console.log(err));
  };

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
    return (
      <Dialog
        open={open.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{open.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <span style={{color: 'black'}}>{open.title}</span> of <span style={{color: 'black'}}>{open.author}</span>?
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
              <Grid item key={i} xs={12} md={6} xl={3} className={classes.gridPaper}>
              <Paper className={classes.paperStyle} elevation={2}>
                <img className={classes.imgStyle} src={book.linkImage
                    ? book.linkImage
                    : `${voidImg}`} alt={book.title}/>
              </Paper>
              <Paper className={classes.paperStyle + " " + classes.paperWidth}>
                <div>
                  <IconButton className={classes.deleteButton} onClick={e => handleClickOpen(i)}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
                <Typography variant="h6" className={classes.titleSize} component="p">{truncateString(book.title, 21)}</Typography>
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
                <div className={classes.checkmoreButton}>
                  <Button size="small" onClick={handleClose} color="primary" variant="outlined">
                    check more
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
  </>
  )
};