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
  TextField
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import axios from 'axios';
import voidImg from '../../images/unDraw/void.svg';
import SearchIcon from '@material-ui/icons/Search';
import nofound from '../../images/unDraw/nofound.svg';
import CircularProgress from '@material-ui/core/CircularProgress';


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
      console.log(res.data.ress);
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
  }, [input]);

  const handleDelete = (e, i) => {
    e.preventDefault();
    console.log(results[i]);
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

  return (
    <>
    <Container
      maxWidth = {false}
      disableGutters
      className = {classes.root}
    >
    <Grid container="container">
    <Grid item="item" xs={12} md={3} lg={2} className={classes.navBorder}>
      <div className={classes.navStyle}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button="button" selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
            <ListItemIcon>
              <ClearAllIcon/>
            </ListItemIcon>
            <ListItemText primary="All my books"/>
          </ListItem>
          <ListItem button="button" selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
            <ListItemIcon>
              <CheckCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Books read"/>
          </ListItem>
          <ListItem button="button" selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
            <ListItemIcon>
              <CheckCircleOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary="Books to read"/>
          </ListItem>
          <ListItem button="button" selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
            <ListItemIcon>
              <FavoriteIcon/>
            </ListItemIcon>
            <ListItemText primary="My favorites"/>
          </ListItem>
        </List>
      </div>
    </Grid>
    <Grid item="item" xs={12} md={9} lg={10}>
      <div style={{
          paddingLeft: '2%',
          paddingTop: '2%'
        }}>
        <TextField id="standard-full-width" label="Live search" style={{
            margin: 8,
            width: 300
          }} placeholder="Fast search" {...visible} value={input} onChange={handleChange} margin="normal" InputLabelProps={{
            shrink: true
          }} variant="outlined"/>
      </div>
      <Grid container="container" spacing={4} className={classes.pad}>
        {
          results.length !== 0 || books.length !== 0
            ? results.map((book, i) => (<Grid item="item" key={i} xs={12} md={6} lg={4} xl={3} className={classes.gridPaper}>
              <Paper className={classes.paperStyle} elevation={2}>
                <img className={classes.imgStyle} src={book.linkImage
                    ? book.linkImage
                    : `${voidImg}`} alt={book.title}/>
              </Paper>
              <Paper className={classes.paperStyle + " " + classes.paperWidth}>
                <IconButton className={classes.deleteButton} onClick={e => handleDelete(e, i)}>
                  <DeleteIcon/>
                </IconButton>
                <Typography variant="h6" style={{
                    fontSize: 18
                  }} component="p">{truncateString(book.title, 21)}</Typography>
                <Typography component="p" variant="subtitle1" className={classes.listSize}>
                  <Typography component="span" display="inline" variant="subtitle2">Author:
                  </Typography>
                  {
                    book.author
                      ? truncateString(book.author, 21)
                      : "Author anavailable"
                  }
                </Typography>
                <Typography component="p" variant="subtitle1" className={classes.listSize}>
                  <Typography component="span" display="inline" variant="subtitle2">Genre:
                  </Typography>
                  {book.genre}
                </Typography>
                <Typography component="p" variant="subtitle1" className={classes.listSize}>
                  <Typography component="span" display="inline" variant="subtitle2">Published:
                  </Typography>
                  {book.publish_date}
                </Typography>
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
  </Container>
  </>
  )
};