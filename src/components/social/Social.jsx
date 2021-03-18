import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: 390,
        width: 60,
        height: 300,
        textAlign: 'center',
    }
}))

export default function Social() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <FacebookIcon />
            </IconButton>
            <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit"><TwitterIcon /></IconButton>
            <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit"><InstagramIcon /></IconButton>

        </div>
    )

}