import axios from 'axios';
import * as types from '../constants';

export const getRecords = () => (async dispatch => {
  const res = await axios.get('/api/records');
  dispatch({
    type: types.GET_RECORDS,
    records: res.data
  });
});

export const createRecord = (record) => (async dispatch => {
  const res = await axios.post('/api/records', record);
  dispatch({
    type: types.CREATE_RECORD,
    record: res.data
  });
});

export const eraseRecords = () => (async dispatch => {
  await axios.delete('/api/records');
  dispatch({
    type: types.ERASE_RECORDS
  });
});
