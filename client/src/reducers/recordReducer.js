import * as types from '../constants';
import * as storage from '../localStorage';
import initialState from '../initialState';

const recordReducer = (state = initialState.records, action) => {
  let records = null;
  let record = null;
  let idx = -1;
  state = storage.get('records');

  if (action.record) {
    record = Object.assign({}, action.record);
  }

  switch (action.type) {
    case types.CREATE_RECORD:
      records = [...state, record];
      storage.set('records', records);
      return records;
    case types.STOP_TIMER:
      records = [...state];
      record = records.find(record => (
        record.timer === action.id &&
        record.month === action.time.getMonth() &&
        record.date === action.time.getDate()
      ));
      record.duration += action.time - Date.parse(action.start);
      idx = records.findIndex(rec => rec._id === record._id);
      records.splice(idx, 1, record);
      storage.set('records', records);
      return records;
    case types.DELETE_TIMER:
      records = [...state];
      records = records.filter(record => record._id !== action.id);
      storage.set('records', records);
      return records;
    case types.ERASE_RECORDS:
      records = [];
      storage.set('records', records);
      return records;
    default:
      return state;
  }
};

export default recordReducer;
