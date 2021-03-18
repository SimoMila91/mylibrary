import React, { useState, useEffect, useContext } from 'react';
import {
    TextField, DialogActions, DialogContent, DialogTitle,
    makeStyles, Button, Grid, Input, InputAdornment,
    IconButton, FormControl, InputLabel,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import { Context } from '../../context/Context';

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

}))

export default function Login({ handleClose }) {
    const classes = useStyle();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [control, setControl] = useState(false);
    const [showPassword, setVisibility] = useState(false);
    const { registered } = useContext(Context);

    const controlEmail = (email) => {
        if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || email === '')
            return true;
        else
            return false;
    };

    const ready = () => {
        if (email !== '' && psw !== '' && controlEmail(email) && psw.length >= 8)
            setControl(true);
        else
            setControl(false);
    };

    useEffect(() => {
        ready();
    }, [email, psw]);

    const signUp = e => {
        e.preventDefault();
        console.log('REGISTRATO INFAME');
        handleClose();
        registered();
    };

    const passwordControl = psw.length >= 8 || psw === '' ? null : { error: true, helperText: 'At least 6 characters' };
    const textField = controlEmail(email) ? null : { error: true, helperText: 'Email is required' };
    const buttonType = control === false ? { disabled: true } : { color: 'primary' };

    return (
        <>
            <div className={classes.dialogStyle}>
                <form action="post" onSubmit={signUp}>
                    <DialogTitle style={{ textAlign: 'center', marginTop: '8%' }} id="form-dialog-title"><b>Signup on My Library</b></DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <PersonIcon color="disabled" />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className={classes.textFieldStyle}
                                    label="Name"
                                    onChange={e => setName(e.target.value)}
                                    id="name"
                                    type="text"
                                    fullWidth
                                    margin="small"
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
                                    margin="small"
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
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <LockIcon color="disabled" />
                            </Grid>
                            <Grid item style={{ paddingTop: 0 }}>
                                <FormControl {...passwordControl}>
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        className={classes.textFieldStyle}
                                        {...passwordControl}
                                        margin="small"
                                        id="name"
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
                    <DialogActions className={classes.buttonStyle}>
                        <Button type="submit" style={{ borderRadius: 50 }} size="medium" variant="contained" {...buttonType}>
                            Signup with your email
                        </Button>
                    </DialogActions>
                </form>
            </div>
        </>
    )
}