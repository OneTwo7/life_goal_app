import React from 'react';
import Timers from './Timers';
import DatePicker from './DatePicker';
import MonthTotal from './MonthTotal';
import Form from '../common/Form';
import TimerList from './TimerList';
import TimerListItem from './TimerListItem';
import TimerInfo from './TimerInfo';
import TimerProgress from './TimerProgress';
import Timer from './Timer';
import TimerButtons from './TimerButtons';
import ClearRecordsButton from './ClearRecordsButton';

export default () => (
  <Timers>
    <DatePicker />
    <MonthTotal />
    <Form />
    <TimerList>
      <TimerListItem>
        <TimerInfo>
          <TimerProgress />
          <Timer />
        </TimerInfo>
        <TimerButtons />
      </TimerListItem>
      <ClearRecordsButton />
    </TimerList>
  </Timers>
);
