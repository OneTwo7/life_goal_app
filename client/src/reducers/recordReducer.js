import * as types from '../constants';
import initialState from '../initialState';

export default (state = initialState.records, action) => {
  let records = null;
  let record = null;
  let idx = -1;
  let time;

  if (action.record) {
    record = Object.assign({}, action.record);
  }

  switch (action.type) {
    case types.GET_RECORDS:
      return action.records;
    case types.CREATE_RECORD:
      records = [...state, record];
      return records;
    case types.STOP_TIMER:
      records = [...state];
      time = new Date();
      record = records.find(record => (
        record.timer === action.timer._id &&
        record.month === time.getMonth() &&
        record.date === time.getDate()
      ));
      record.duration += time - Date.parse(action.timer.start);
      idx = records.findIndex(rec => rec._id === record._id);
      records.splice(idx, 1, record);
      return records;
    case types.DELETE_TIMER:
      records = [...state];
      records = records.filter(record => record._id !== action.id);
      return records;
    case types.ERASE_RECORDS:
      records = [];
      return records;
    default:
      return state;
  }
};
