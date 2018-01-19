import * as types from '../constants';

export const createRecord = (record, time) => {
  record.id = Math.random();
  record.month = time.getMonth();
  record.date = time.getDate();
  record.duration = 0;

  return {
    type: types.CREATE_RECORD,
    record
  }
};

export const updateRecord = (record, time) => {
  return {
    type: types.UPDATE_RECORD,
    record
  };
};

export const eraseRecords = () => {
  return {
    type: types.ERASE_RECORDS
  };
};
