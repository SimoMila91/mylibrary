import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Avatar,
  Divider,
  IconButton,
  TextField,
  Button
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import TimeAgo from 'react-timeago';
import axios from 'axios';
import _ from 'lodash';
import {Context} from '../../context/Context';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    padding: '5% 6%'
  },
  ciao: {
    asoasfaf: '1px'
  },
  textfieldStyle: {
    padding: '2px 10px 2px 10px',
    fontSize: 11
  },
  resize: {
    fontSize: 14
  },
  buttonStyle: {
    color: '#007bff'
  },
  p: {
    marginTop: 'auto',
    marginBottom: 10
  },
  flexDiv: {
    display: 'flex',
    marginBottom: 30
  },
  formPad: {
    paddingBottom: 10
  },
  paperPad: {
    padding: '0 1% 1.2% 1%'
  },
  paperPadReview: {
    padding: "10px 20px"
  },
  textLeft: {
    textAlign: "left"
  },
  mrgTopTen: {
    marginTop: 10
  },
  dividerStyle: {
    margin: "5px 0",
    backgroundColor: "#fff"
  },
  timeagoStyle: {
    color: "grey",
    marginTop: 20,
    fontSize: 15
  }
}));

export default function Reviews({id}) {
  const classes = useStyles();
  const [review, setReview] = useState(
    localStorage.getItem('reviews')
    ? JSON.parse(localStorage.getItem('reviews'))
    : []);
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const {books, snackOpenFun} = useContext(Context);

  const request = useCallback(() => {
    const payload = {
      idBook: books[id].id
    };
    axios.post("http://localhost:3000/getreviews", payload).then(res => {
      localStorage.setItem('reviews', JSON.stringify(res.data.reviews));
      setReview(res.data.reviews);
    }).catch(err => console.log(err));
  }, [books, id]);

  useEffect(() => {
    request();
  }, [request]);

  const avatarName = str => {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === str.charAt(i).toUpperCase()) {
        res = res + str.charAt(i);
      }
    }
    return res;
  };

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const writeRev = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const payload = {
      idBook: books[id].id,
      idUser: localStorage.getItem('idUser'),
      review: text,
      date: date,
      name: localStorage.getItem('username')
    };
    axios.post("http://localhost:3000/reviews", payload).then(res => {
      setShow(false);
      snackOpenFun(res.data, 'success');
      setText('');
      setReview(oldReview => [
        ...oldReview,
        payload
      ]);
      localStorage.removeItem('reviews');
      localStorage.setItem('reviews', JSON.stringify(review));
    }).catch(err => console.log(err));
  };

  const showButton = text.length < 2
    ? {
      disabled: true
    }
    : null;
  return (<div className={classes.root}>
    <h2>Reviews...</h2>
    <div className={classes.flexDiv}>
      <p className={classes.p}>Write your personal review</p>
      <IconButton onClick={(
          ) => show
          ? setShow(false)
          : setShow(true)}>
        <CreateIcon/>
      </IconButton>
    </div>
    {
      show
        ? <div className={classes.formPad}>
            <Paper elevation={3}>
              <div className={classes.paperPad}>
                <form action="post" onSubmit={writeRev}>
                  <TextField autoFocus={true} InputProps={{
                      disableUnderline: true,
                      classes: {
                        input: classes.resize
                      }
                    }} className={classes.textfieldStyle} placeholder="What i think.." type="text" value={text} multiline="multiline" margin="dense" rows={5} fullWidth="fullWidth" onChange={(e) => setText(e.target.value)}/>
                  <Button type="submit" className={classes.buttonStyle} size="medium" variant="contained" endIcon={<SendIcon />} {...showButton}>
                    Send
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
        : null
    }
    {
      review
        ? _.orderBy(review, ['date'], ['desc']).map((r, i) => (<div key={i}>
          <Paper className={classes.paperPadReview} elevation={4}>
            <Grid container="container" wrap="nowrap" spacing={2}>
              <Grid item="item">
                <Avatar style={{
                    fontSize: 12,
                    backgroundColor: `${getRandomColor()}`
                  }} alt="Remy Sharp">{avatarName(r.name)}</Avatar>
              </Grid>
              <Grid item="item" xs="xs" zeroMinWidth="zeroMinWidth">
                <h5 className={classes.textLeft}>{r.name}</h5>
                <p className={classes.textLeft + " " + classes.mrgTopTen}>
                  {r.review}
                </p>
                <p className={classes.textLeft + " " + classes.timeagoStyle}>
                  <em>posted
                    <TimeAgo date={r.date} unite="minute"/></em>
                </p>
              </Grid>
            </Grid>
          </Paper>
          <Divider variant="fullWidth" className={classes.dividerStyle}/>
        </div>))
        : null
    }
  </div>)
}
