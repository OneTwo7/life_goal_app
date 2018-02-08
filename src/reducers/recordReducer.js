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
      if (!records[record.timerId]) {
        records[record.timerId] = {};
      }
      if (!records[record.timerId][record.month]) {
        records[record.timerId][record.month] = {};
      }
      record.duration = 0;
      records[record.timerId][record.month][record.date] = record;
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
      records[record.timerId][record.month][record.date] = record;
      storage.set('records', records);
      return records;
    case types.DELETE_TIMER:
      records = Object.assign({}, state);
      delete records[action.id];
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
