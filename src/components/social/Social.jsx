import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'inherit',
            float: 'right',
        },
    },
    sizeFont: {
        fontSize: 13,
        margin: 'auto',
    },
}));

export default function Social() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.sizeFont}>Built by Simone Milanesio</span>
            <div>
                <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <FacebookIcon />
                </IconButton>
                <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <TwitterIcon />
                    </IconButton>
                <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <LinkedInIcon />
                </IconButton>
            </div>
        </div>
    )

}
