import { Container, Divider, makeStyles, Grid, Link } from '@material-ui/core';
import React from 'react';
import google from '../images/google.svg';
import logoS2I from '../images/logoS2I.png';
import react from '../images/unDraw/react.svg';
import nodejs from '../images/nodejs.svg';
import sql from '../images/sql-server.png';
import material from '../images/material.png';
import newsapi from '../images/news.png';
import Social from '../components/social/Social';

const font = "'Satisfy', cursive";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        padding: '5rem',
        paddingBottom: '1rem',
    },
    backgroundColor: {
        background: '#dfe0d7',
        width: '100%',
    },
    libraryLogo: {
        fontFamily: font,
        fontSize: 30,
    },
    heightOne: {
        height: '4rem',
    },
    heightTwo: {
        height: '4rem',
        margin: 'auto',
    },
    firstItem: {
        margin: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 16,
        },
    },
    dividerStyle: {
        marginTop: '3rem',
    },
    marginGrid: {
        marginTop: '1rem',
    },
    endFooter: {
        margin: '30px 0',
    },
    textRight: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
    },
    textLeft: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    },
}));



export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.backgroundColor}>
            <Divider />
            <Container className={classes.root}>
               <Grid
                  container
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                    <Grid item className={classes.firstItem}>
                        <Link href="https://developers.google.com/books" target="_blank"><img className={classes.heightOne} src={google} alt="Google logo"/></Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://nodejs.org/en/" target="_blank"><img className={classes.heightOne} src={nodejs} alt="Nodejs logo"/></Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://reactjs.org/" target="_blank"><img className={classes.heightOne} src={react} alt="React logo"/></Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://www.phpmyadmin.net/" target="_blank"><img className={classes.heightOne} src={sql} alt="Sql server logo"/></Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/newscatcher" target="_blank"><img className={classes.heightTwo} src={newsapi} alt="NewsApi logo"/></Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://material-ui.com/" target="_blank"><img className={classes.heightOne} src={material} alt="Material UI logo"/></Link>
                    </Grid>
               </Grid>
               <Grid
                  container
                  spacing={3}
                  justify="center"
                  alignItems="center"
                  className={classes.marginGrid}
                >
                    <Grid item xs={12} sm={'auto'}>
                        <span>Developed for</span>
                    </Grid>
                    <Grid item xs={12} sm={'auto'}>
                        <img src={logoS2I} alt="Start2Impact logo"/>
                    </Grid>
                    <Grid item xs={12} sm={'auto'}>
                        <span>Start2Impact</span>
                    </Grid>
                    <Grid item xs={12}>
                        <span>For more info <a href="https://www.start2impact.it/" target="_blank" rel="noreferrer" title="start2impact">www.start2impact.it</a></span>
                    </Grid>
                </Grid>
               <Divider className={classes.dividerStyle} />
               <Grid container className={classes.endFooter}>
                    <Grid item xs={12} md={6} className={classes.textLeft}>
                    <span className={classes.libraryLogo}>My Library</span>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.textRight}>
                        <Social />
                    </Grid>
               </Grid>
            </Container>
        </div>
    );
}
