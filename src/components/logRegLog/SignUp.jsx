import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import {
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Button,
  Grid,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SecurityIcon from '@material-ui/icons/Security';
import {
  Context
} from '../../context/Context';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
  dialogStyle: {
    padding: 15,
    [theme.breakpoints.up('sm')]: {
      padding: '0 4rem',
    },
    maxWidth: 600,
  },
  textFieldStyle: {
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: 140,
    },
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 340,
    },
  },
  buttonStyle: {
    justifyContent: 'center',
    paddingTop: 50,
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'green',
    "&:hover": {
      color: 'black',
      textDecoration: 'none',
    },
  },
  questionStyle: {
    padding: '11% 0 0',
  },
  marginZero: {
    margin: 0,
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
    color: 'brown'
  },
  title: {
    textAlign: 'center',
    marginTop: '8%',
  },
  overHid: {
    overflow: 'hidden'
  },
  padZero: {
    padding: 0,
  },
  bRadius: {
    borderRadius: 50,
    padding: 10,
  },
  padOver: {
    overflow: 'initial',
  }
}));

export default function Login({
  handleClose
}) {
  const classes = useStyle();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [question, setQuestion] = useState('');
  const [control, setControl] = useState(false);
  const [showPassword, setVisibility] = useState(false);
  const {
    snackOpenFun,
    setForm
  } = useContext(Context);

  const controlEmail = (email) => {
    if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || email === '')
      return true;
    else
      return false;
  };

  useEffect(() => {
    if (email !== '' && psw !== '' && controlEmail(email) && psw.length >= 8 && name !== '' && question !== '')
      setControl(true);
    else
      setControl(false);
  }, [email, psw, name, question]);

  const signup = e => {
    e.preventDefault();
    const payload = {
      name,
      email,
      psw,
      question
    };
    axios.post("https://my-library-backend-italy.herokuapp.com/signup", payload)
      .then(res => {
        snackOpenFun(res.data, 'success');
        setForm('Login');
        handleClose();
      }).catch((err) => {
        console.log(err.response);
        snackOpenFun(err.response.data, 'info');
      });
  };

  const passwordControl = psw.length >= 8 || psw === '' ? null : {
    error: true
  };
  const textField = controlEmail(email) ? null : {
    error: true,
    helperText: 'Email is required'
  };
  const textFieldName = name === '' && controlEmail(email) && psw.length >= 8 ? {
    helperText: 'Also name is required'
  } : null;
  const buttonType = control === false ? {
    disabled: true
  } : {
    color: 'primary'
  };

  return (
    <>
            <div className={classes.dialogStyle}>
                <form action="post" onSubmit={signup}>
                    <DialogTitle className={classes.title} id="form-dialog-title"><b>Signup on My Library</b></DialogTitle>
                    <DialogContent className={classes.padOver}>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <PersonIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
                                    {...textFieldName}
                                    required
                                    label="Name"
                                    onChange={e => setName(e.target.value)}
                                    id="name"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
                                    {...textField}
                                    required
                                    id="email"
                                    label="E-Mail"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogContent className={classes.overHid + " " + classes.padOver}>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <LockIcon color="disabled" />
                            </Grid>
                            <Grid item className={classes.padZero}>
                                <FormControl {...passwordControl}>
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        className={classes.textFieldStyle}
                                        {...passwordControl}
                                        aria-describedby="my-helper-text"
                                        id="psw"
                                        value={psw}
                                        onChange={e => setPsw(e.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={e => showPassword ? setVisibility(false) : setVisibility(true)}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff color="disabled" />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {psw.length >= 8 || psw === '' ? null : <FormHelperText id="my-helper-text">At least 8 characters</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.questionStyle} spacing={2} alignItems="flex-end">
                            <Grid item>
                                <HelpOutlineIcon />
                            </Grid>
                            <Grid item>
                                  <p className={classes.marginZero}>Who is your best friend?</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <SecurityIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
                                    required
                                    label="Security answer"
                                    onChange={e => setQuestion(e.target.value)}
                                    id="question"
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className={classes.buttonStyle}>
                        <Button type="submit" className={classes.bRadius} size="medium" variant="contained" {...buttonType}>
                            Signup with your email
                        </Button>
                    </DialogActions>
                </form>
            </div>
        </>
  )
}
