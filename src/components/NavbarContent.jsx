import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    titleWrapper: {
        textAlign: 'center',
    },
    linkStyle: {
        paddingTop: 30,
        fontSize: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
        fontWeight: 'bold',
    },
}));

export default function NavbarContent() {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div className={classes.linkStyle}>
                    <ul>
                        <li><Button style={{fontSize: 17}} variant="contained"><NavLink to="/" style={{ color: '#212529', textDecoration: 'none' }}>HOME</NavLink></Button></li>
                        <li><Button style={{fontSize: 17}} variant="contained"><NavLink to="/search" style={{ color: '#212529', textDecoration: 'none' }}>SEARCH</NavLink></Button></li>
                        <li><Button style={{fontSize: 17}} variant="contained">ARTICLES</Button></li>
                        <li><Button style={{fontSize: 17}} variant="contained">FAQ</Button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};