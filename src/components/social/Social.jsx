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
    linkColor: {
        color: 'inherit',
        '&:hover': {
            color: 'inherit',
        }
    }
}));

export default function Social() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.sizeFont}>Built by Simone Milanesio</span>
            <div>
                <a className={classes.linkColor} href="https://www.linkedin.com/in/simone-milanesio-917753182/" rel="noreferrer" target="_blank">
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <LinkedInIcon />
                    </IconButton>
                </a>
                <a className={classes.linkColor} href="https://www.facebook.com/" rel="noreferrer" target="_blank">
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <FacebookIcon />
                    </IconButton>
                </a>
                <a className={classes.linkColor} href="https://twitter.com/SimoMilanesio" rel="noreferrer" target="_blank">
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <TwitterIcon />
                    </IconButton>
                </a>
                <a className={classes.linkColor} href="https://www.instagram.com/simo_milanesio/" rel="noreferrer" target="_blank">
                    <IconButton aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                        <InstagramIcon />
                    </IconButton>
                </a>
            </div>
        </div>
    )

}
