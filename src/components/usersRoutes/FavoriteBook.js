import axios from 'axios';

export default function favoriteBook(payload, snackOpenFun) {
    axios.post("http://localhost:3000/favorite", payload)
        .then(res => {
            snackOpenFun(res.data, 'success');
            console.log(res.data);
        }).catch(err => {
            console.warn(err.response);
        });
};