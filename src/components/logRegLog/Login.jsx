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
    }
}))

export default function Login({ handleClose }) {
    const classes = useStyle();

    const { snackOpenFun, renderButton } = useContext(Context);
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [control, setControl] = useState(false);
    const [showPassword, setVisibility] = useState(false);

    const controlEmail = (email) => {
        if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || email === '')
            return true;
        else
            return false;
    };


    useEffect(() => {
        if (email !== '' && psw !== '' && controlEmail(email) && psw.length >= 8)
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
        axios.post("http://localhost:3000/login", payload)
            .then(res => {
                const response = res.data;
                snackOpenFun(response.string, 'success');
                localStorage.setItem('token', response.token);
                localStorage.setItem('idUser', response.id);
                renderButton();
                handleClose();
            }).catch(err => {
                snackOpenFun(err.response.data, 'info');
            });
    }

    const passwordControl = psw.length >= 8 || psw === '' ? null : { error: true };
    const textField = controlEmail(email) ? null : { error: true, helperText: 'Email is required' };
    const buttonType = control === false ? { disabled: true } : { color: 'primary' };

    return (
        <>
            <div className={classes.dialogStyle}>
                <form onSubmit={login}>
                    <DialogTitle style={{ textAlign: 'center', marginTop: '8%' }} id="form-dialog-title"><b>Login on My Library</b></DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
                                    {...textField}
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
                    <DialogContent style={{ overflow: 'hidden' }}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <FormControl {...passwordControl} >
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        className={classes.textFieldStyle}
                                        {...passwordControl}
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
                    <DialogContent style={{ textAlign: 'end' }}>
                        <p className={classes.forgotPsw}><NavLink to="/" onClick={handleClose} className={classes.linkStyle}>Do you forgot your password?</NavLink></p>

                    </DialogContent>
                    <DialogActions className={classes.buttonSyle}>
                        <Button style={{ borderRadius: 50 }} type="submit" size="medium" variant="contained" {...buttonType}>
                            Login with your email
                    </Button>
                    </DialogActions>
                </form>
            </div>

        </>
    )
}