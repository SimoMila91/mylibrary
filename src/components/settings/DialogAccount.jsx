import React, {
  useState,
  useContext,
} from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';

const useStyles = makeStyles(theme => ({
  right: {
    justifyContent: 'flex-end !important'
  },
  inputStyle: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
    },
  },
}));

export default function DialogAccount(props) {
  const classes = useStyles();
  const { snackOpenFun } = useContext(Context);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const initialSetting = {
    emailError: '',
    answerError: ''
  };
  const [error, setError] = useState(initialSetting);
  const showInitialSettings = {
    firstInputs: true,
    secondInputs: false,
  };

  const [show, setShow] = useState(showInitialSettings);
  const [psw, setPsw] = useState('');
  const [checkPsw, setCheckPsw] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      question: text,
      idUser: localStorage.getItem('idUser'),

    };
    axios.post(`https://my-library-backend-italy.herokuapp.com/forgotPassword`, payload).then(res => {
      setError(initialSetting);
      setShow({
        firstInputs: false,
        secondInputs: true,
      });
      setText('');
      setEmail('');
    }).catch(err => {
      if (err.response.data.includes('email')) {
        setError({
          emailError: err.response.data
        });
      } else if (err.response.data.includes('answer')) {
        setError({
          answerError: err.response.data
        });
      };
    });
  };

  const handleClose = () => {
    setShow(showInitialSettings);
    setText('');
    setEmail('');
    setError(initialSetting);
    setPsw('');
    setCheckPsw('');
    props.handleClose();
  };

  const updateRequest = () => {
    const payload = {
      idUser: localStorage.getItem('idUser'),
      psw: psw
    };

    if (psw === checkPsw) {
      axios.put(`https://my-library-backend-italy.herokuapp.com/${props.request}`, payload)
      .then(res => {
        console.log(res);
        setRedirect(true);
        props.handleClose();
      }).catch(err => {
        console.log(err.response.data);
      });
    } else {
      snackOpenFun('Passwords are not the same', 'error');
    }
  }

  const deleteAccount = () => {
    const payload = {
      psw: psw,
      idUser: localStorage.getItem('idUser'),
    };

    axios.delete(`https://my-library-backend-italy.herokuapp.com/${props.request}`, payload)
    .then(res => {
      console.log(res);
      setRedirect(true);
      props.handleClose();
    }).catch(err => {
      console.log(err);
    });
  };

  const controlButton = email.length > 8 && text.length > 0 ? { color: 'secondary' } : { disabled: true };
  const controlButtonTwo = psw.length > 8 ? { color: 'secondary' } : { disabled: true };
  const checkEmail = error.emailError !== undefined && error.emailError !== '' ? { helperText: `${error.emailError}`, error: true } : null;
  const checkAnswer = error.answerError !== undefined && error.answerError !== '' ? { helperText: `${error.answerError}`, error: true } : null;


    return (
      <div>
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                {
                  show.firstInputs ?
                  <>
                    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                    <form onSubmit={handleRequest}>
                      <DialogContent>
                        <div className={classes.inputStyle}>
                          <TextField id="outlined-full-width" label="Insert your email" style={{
                              margin: 8
                            }} fullWidth value={email} onChange={e => setEmail(e.target.value)} margin="normal" InputLabelProps={{
                              shrink: true
                            }} variant="outlined"
                            {...checkEmail}
                            autoFocus
                          />
                          <TextField id="outlined-full-width" label="Who is your best friend?" style={{
                              margin: 8
                            }} fullWidth value={text} onChange={e => setText(e.target.value)} margin="normal" InputLabelProps={{
                              shrink: true
                            }} variant="outlined"
                            {...checkAnswer}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.right}>
                        <Button onClick={handleClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                        <Button {...controlButton} type="submit" variant="contained" autoFocus="autoFocus">
                          Submit
                        </Button>
                      </DialogActions>
                    </form>
                  </>
                : show.secondInputs && props.request.includes('changePassword') ?
                    <>
                    <DialogTitle id="psw">Change your password</DialogTitle>
                    <form onSubmit={updateRequest}>
                      <DialogContent>
                        <div className={classes.inputStyle}>
                          <TextField id="outlined-full-width" label="Your new password" style={{
                              margin: 8
                            }} fullWidth margin="normal" InputLabelProps={{
                              shrink: true
                            }} variant="outlined"
                            helperText="Important: password must be greater than 8"
                            value={psw}
                            onChange={e => setPsw(e.target.value)}
                            autoFocus
                          />
                        <TextField id="checkPsw" label="Retype your password" style={{
                              margin: 8
                            }} fullWidth margin="normal" InputLabelProps={{
                              shrink: true
                            }} variant="outlined"
                            value={checkPsw}
                            onChange={e => setCheckPsw(e.target.value)}
                          />
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.right}>
                        <Button onClick={handleClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                        <Button {...controlButtonTwo} type="submit" variant="contained" autoFocus="autoFocus">
                          {props.buttonText}
                        </Button>
                      </DialogActions>
                    </form>
                    </>
                  : show.secondInputs && props.request.includes('deleteAccount') ?
                  <>
                    <DialogTitle id="alert-dialog-title">Type your password in order to be able to delete your account</DialogTitle>
                    <form onSubmit={deleteAccount}>
                      <DialogContent>
                        <div className={classes.inputStyle}>
                          <TextField id="outlined-full-width" label="Type your password" style={{
                              margin: 8
                            }} fullWidth margin="normal" InputLabelProps={{
                              shrink: true
                            }} variant="outlined"
                            value={psw}
                            onChange={e => setPsw(e.target.value)}
                            type="password"
                          />
                        </div>
                      </DialogContent>
                      <DialogActions className={classes.right}>
                        <Button onClick={handleClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                        <Button {...controlButtonTwo} type="submit" variant="contained" autoFocus="autoFocus">
                          {props.buttonText}
                        </Button>
                      </DialogActions>
                    </form>
                  </>
                :
                  null
                }
        </Dialog>
      </div>
    )

}
