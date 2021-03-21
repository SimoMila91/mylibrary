import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogTitle, FormControl, Select, InputLabel, DialogActions, Button } from '@material-ui/core';
import { Context } from '../context/Context';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexwrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column-reverse',
        },
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
    const { handleChangeAge, handleChangeType,
        type, filterGenre, handleFilterGenreChange,
        language, handleChangeLang,
    } = useContext(Context);

    const close = (e) => {
        handleChangeAge(age);
        handleClose(e);
    };

    let genreFilter = [
        'authors',
        'feminism',
        'fiction',
        'inspirational',
        'poetry',
        'love',
        'fantasy',
        'romance',
        'suspense',
        'horror',
        'noire',
    ];

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">{"Set your settings"}</DialogTitle>
            <DialogContent>
                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Order by</InputLabel>
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
                            onChange={e => handleChangeType(e)}
                        >
                            <option aria-label="None" value='' />
                            <option value="free-ebooks">Free ebooks</option>
                            <option value="ebooks">All ebooks</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Genre</InputLabel>
                        <Select
                            native
                            value={filterGenre}
                            onChange={e => handleFilterGenreChange(e)}
                        >
                            <option aria-label="None" value='' />
                            {genreFilter.map(i => (
                                <option key={i} value={`subject:${i}`}>{i}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Lang</InputLabel>
                        <Select
                            native
                            value={language}
                            onChange={e => handleChangeLang(e)}
                        >
                            <option value="it">italian</option>
                            <option value="en">english</option>
                            <option value="ko">korean</option>
                            <option value="ja">japanese</option>
                            <option value="zh-TW">chinese</option>
                            <option value="fr">french</option>
                            <option value="no">norwegian</option>
                            <option value="de">german</option>
                            <option value="ro">romanian</option>
                            <option value="pt-BR">portuguese</option>
                            <option value="es">spanish</option>
                            <option value="th">thai</option>
                            <option value="vi">vietnamese</option>
                            <option value="uk">ukrainian</option>
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