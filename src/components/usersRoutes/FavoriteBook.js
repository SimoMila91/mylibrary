import axios from 'axios';

export default function favoriteBook(payload, snackOpenFun) {
    let ress; 
    axios.post("http://localhost:3000/favorite", payload)
        .then(res => {
            snackOpenFun(res.data, 'success');
            ress = res.status;
        }).catch(err => {
            console.warn(err.response);
            ress = err.response; 
        });
    return ress;
} 