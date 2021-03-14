import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogTitle, FormControl, Select, InputLabel, DialogActions, Button } from '@material-ui/core';
import { Context } from '../context/Context';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexwrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


export default function ModalFilters({ handleClose, onClose }) {
    const classes = useStyles();

    const [age, setAge] = useState(Context.age);
    // context functions 
    const { handleChangeAge, handleChangeType, type } = useContext(Context);

    const close = (e) => {
        handleChangeAge(age);
        handleClose(e);
    };

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">{"Set your settings"}</DialogTitle>
            <DialogContent>
                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Age</InputLabel>
                        <Select
                            value={age}
                            native
                            onChange={e => setAge(e.target.value)}
                        >
                            <option aria-label="None" value='' />
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            native
                            value={type}
                            onChange={handleChangeType}
                        >
                            <option aria-label="None" value='' />
                            <option value="free-ebooks">Free-ebooks</option>
                            <option value="ebooks">Only ebooks</option>
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} to="/search" color="primary">
                    Cancel
                </Button>
                <Button onClick={close} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </>
    );
};