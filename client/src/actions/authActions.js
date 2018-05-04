import axios from 'axios';
import { FETCH_USER } from '../constants';

export const fetchUser = () => (async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    user: res.data
  });
});
