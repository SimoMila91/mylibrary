import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';


const font = "'Satisfy', cursive";

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
    preTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 15,
        },
    },
    titleStyle: {
        fontFamily: font,
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: 50,
        },
    },
}));

export default function NavbarContent() {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div className={classes.linkStyle}>
                    <ul>
                        <li><NavLink to="/" style={{ color: '#212529', textDecoration: 'none' }}>HOME</NavLink></li>
                        <li><NavLink to="/search" style={{ color: '#212529', textDecoration: 'none' }}>SEARCH</NavLink></li>
                        <li>FORUM</li>
                        <li>CHAT</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};