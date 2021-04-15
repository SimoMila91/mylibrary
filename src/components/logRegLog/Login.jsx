import React, { useState, useEffect, useContext } from 'react';
import {
    TextField, DialogActions, DialogContent, DialogTitle,
    makeStyles, Button, Grid, Input, InputAdornment,
    IconButton, FormControl, InputLabel
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Context } from '../../context/Context';
import axios from 'axios';
import DialogAccount from '../settings/DialogAccount';

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
        paddingTop: 10,
    },
    forgotPsw: {
        fontSize: 13,
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'green',
        "&:hover": {
            color: 'black',
            textDecoration: 'none',
        },
    },
    dialogTitle: {
      textAlign: 'center',
      marginTop: '8%'
    },
    hiddenOverflow: {
        overflow: 'hidden'
    },
    borderR: {
        borderRadius: 50,
    },
    textLeft: {
        textAlign: 'left'
    }
}));

export default function Login({ handleClose }) {
    const classes = useStyle();

    const { snackOpenFun, renderButton } = useContext(Context);
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [control, setControl] = useState(false);
    const [showPassword, setVisibility] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({buttonText: '', title: '', request: ''});

    useEffect(() => {
        if (email !== '' && psw.length >= 8)
            setControl(true);
        else
            setControl(false);
    }, [email, psw,]);

    const login = e => {
        e.preventDefault();
        const payload = {
            email,
            psw
        };
        axios.post("https://my-library-backend-italy.herokuapp.com/login", payload)
            .then(res => {
                const response = res.data;
                snackOpenFun(response.string, 'success');
                localStorage.setItem('token', response.token);
                localStorage.setItem('idUser', response.id);
                localStorage.setItem('username', response.name);
                renderButton();
                handleClose();
            }).catch(err => {
                snackOpenFun(err.response.data, 'info');
            });
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setData({
            buttonText: 'Modify',
            title: 'Follow these steps in order to update your password',
            request: 'changePassword'
        });
        setOpen(true);
    };

    const buttonType = control === false ? { disabled: true } : { color: 'primary' };

    return (
        <>
            <div className={classes.dialogStyle}>
                <form onSubmit={login}>
                    <DialogTitle className={classes.dialogTitle} id="form-dialog-title"><b>Login on My Library</b></DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
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
                    <DialogContent className={classes.hiddenOverflow}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        className={classes.textFieldStyle}
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
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogContent className={classes.textLeft}>
                        <p className={classes.forgotPsw}><NavLink to="/" onClick={handleOpenDialog} className={classes.linkStyle}>Do you forgot your password?</NavLink></p>
                    </DialogContent>
                    <DialogActions className={classes.buttonSyle}>
                        <Button className={classes.borderR} type="submit" size="medium" variant="contained" {...buttonType}>
                            Login with your email
                        </Button>
                    </DialogActions>
                </form>
            </div>
            <DialogAccount request={data.request} buttonText={data.buttonText} title={data.title} handleClose={handleCloseDialog} open={open}/>
        </>
    )
}
