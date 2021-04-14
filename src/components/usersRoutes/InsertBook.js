import axios from 'axios';

export default function insertBook(payload, snackOpenFun) { 
    axios.post("https://my-library-backend-italy.herokuapp.com/insert", payload)
    .then(res => {
        snackOpenFun(res.data, 'success');
    }).catch((err) => {
       snackOpenFun(err.response.data, 'info');
    });
};