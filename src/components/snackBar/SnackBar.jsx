import React, { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {Context} from '../../context/Context';

export default function SnackBar() {

    const { reSetSnackbar, snackOpen } = useContext(Context); 
    
    return (
        <>
        <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackOpen.open}
                autoHideDuration={5000}
                onClose={reSetSnackbar}
            >
                <Alert severity={snackOpen.type !== '' ? snackOpen.type : 'success'}>{snackOpen.message}</Alert>
            </Snackbar>
        </>
    )
};