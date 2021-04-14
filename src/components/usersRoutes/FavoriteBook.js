import axios from 'axios';

export default function favoriteBook(payload, snackOpenFun) {
    axios.post("https://my-library-backend-italy.herokuapp.com/favorite", payload)
        .then(res => {
            snackOpenFun(res.data, 'success');
            console.log(res.data);
        }).catch(err => {
            console.warn(err.response);
        });
};