import * as types from '../constants';
import * as storage from '../localStorage';

const recordReducer = (state = [], action) => {
  let records = null;
  let record = null;
  state = storage.get('records');

  if (action.record) {
    record = Object.assign({}, action.record);
  }

  switch (action.type) {
    case types.CREATE_RECORD:
      records = Object.assign({}, state);
      if (!records[record.month]) {
        records[record.month] = {};
      }
      if (!records[record.month][record.date]) {
        records[record.month][record.date] = {};
      }
      record.duration = 0;
      records[record.month][record.date][record.timerId] = record;
      storage.set('records', records);
      return records;
    case types.UPDATE_RECORD:
      const timers = storage.get('timers');
      const length = timers.length;
      for (let i = 0; i < length; i++) {
        if (parseFloat(timers[i].id) === record.timerId) {
          record.duration += Date.parse(timers[i].stop) - Date.parse(timers[i].start);
        }
      }
      records = Object.assign({}, state);
      records[record.month][record.date][record.timerId] = record;
      storage.set('records', records);
      return records;
    case types.ERASE_RECORDS:
      records = {};
      storage.set('records', records);
      return records;
    default:
      return state;
  }
};

export default recordReducer;
