import axios from 'axios';

export const insertBook = (payload, snackOpenFun) => { 
    axios.post("http://localhost:3000/insert", payload)
    .then(res => {
        snackOpenFun(res.data, 'success');
    }).catch((err) => {
       snackOpenFun(err.response.data, 'info');
    });
};