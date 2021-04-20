import axios from 'axios';

export default function insertBook(payload, snackOpenFun) {
  axios.post("https://my-library-backend-italy.herokuapp.com/insert", payload)
    .then(res => {
      snackOpenFun(res.data, 'success');
    }).catch((err) => {
      if (err.response.status === 409) {
        snackOpenFun(err.response.data, 'info');
      } else {
        snackOpenFun('Internal server error, try again later or contact the site owner', 'warning');
      }
    });
};