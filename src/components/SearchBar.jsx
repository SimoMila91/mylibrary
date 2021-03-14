import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import { InputBase, Paper, IconButton, Divider, Dialog, Slide } from '@material-ui/core';
import ModalFilters from './ModalFilters';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        margin: 'auto',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchBar({ onFormSubmit }) {
    const classes = useStyles();
    const [term, setTerm] = useState('');
    const [modalState, setIsOpen] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        if (term !== '')
            onFormSubmit(term);
    };

    const onClose = e => {
        e.preventDefault();
        setIsOpen(false);
    };

    const handleClose = e => {
        e.preventDefault();
        setIsOpen(false);
        onFormSubmit(term);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Paper className={classes.root}>
                    <IconButton className={classes.iconButton} aria-label='menu'>
                        <LibraryBooksIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search…"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation='vertical' />
                    <IconButton onClick={() => setIsOpen(true)} color="primary" className={classes.iconButton} aria-label="directions">
                        <TuneIcon />
                    </IconButton>
                </Paper>
            </form>

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                className={classes.modal}
                TransitionComponent={Transition}
                keepMounted
                open={modalState}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalFilters onClose={onClose} handleClose={handleClose} />
            </Dialog>

        </div>
    );
};