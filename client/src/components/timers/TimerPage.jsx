import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timerActions from '../../actions/timerActions';
import * as recordActions from '../../actions/recordActions';
import Form from '../common/Form';
import TimersList from './TimersList';
import DatePicker from './DatePicker';
import MonthTotal from './MonthTotal';

class TimerPage extends React.Component {
  constructor (props) {
    super(props);

    const { time, month, date } = props;

    this.state = {
      time,
      month,
      date,
      text: '',
      currentMonth: month,
      currentDate: date
    }

    this.formatTime = this.formatTime.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.eraseRecords = this.eraseRecords.bind(this);
    this.reloadTimers = this.reloadTimers.bind(this);
  }

  /* Lifecycle Methods */

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth !== this.props.auth) {
      if (nextProps.auth._id) {
        this.props.actions.getRecords();
      }
    }

    if (nextProps.timers.length) {
      const timer = nextProps.timers.find(timer => timer.running);
      if (timer) {
        this.reloadTimers();
      }
    }
  }

  componentDidMount () {
    let time;
    this.interval = setInterval(() => {
      time = new Date();
      // check whether it is midnight
      if (time.getHours() === 0 && time.getMinutes() === 0) {
        this.reloadTimers();
      }
      this.setState({ time });
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  /* Time Format Methods */

  formatTime (time) {
    if (isNaN(time) || time < 0) {
      return '00:00';
    }
    const minutes = Math.floor(time/1000/60%60);
    const hours = Math.floor(time/1000/60/60);
    return this.l0(hours) + ':' + this.l0(minutes);
  }

  l0 (num) {
    return num < 10 ? '0' + num : num;
  }

  /* Selecting Date Methods */

  formatDate (month, date) {
    const year = this.state.time.getFullYear();
    month = this.l0(month + 1);
    date = this.l0(date);
    return `${year}-${month}-${date}`;
  }

  onDateChange (event) {
    const d = event.target.value;
    if (d) {
      const month = d.slice(5, 7) - 1;
      const date = +d.slice(8);
      this.setState({ month, date });
    }
  }

  /* Form Methods */

  onInputChange (event) {
    this.setState({ text: event.target.value });
  }

  onButtonClick (event) {
    const text = this.state.text;

    if (!text) {
      alert('Give your timer a name!');
      return;
    }

    const user = this.props.auth._id;

    this.props.actions.createTimer({ text, user });
    this.setState({ text: '' });
  }

  /* Timer Methods */

  setTimer (event) {
    const element = event.target;
    const id = this.getTimerId(element);
    const text = element.innerHTML;
    const { actions, startTime } = this.props;

    if (text === 'Start') {
      actions.startTimer(id);
      this.createRecord(id);
    } else {
      actions.stopTimer(id, startTime);
    }
  }

  deleteTimer (event) {
    const id = this.getTimerId(event.target);
    this.props.actions.deleteTimer(id);
  }

  getTimerId (element) {
    return element.parentElement.id;
  }

  reloadTimers () {
    const { timers, actions } = this.props;
    const time = new Date();
    const timer = timers.filter(timer => timer.running);
    // check whether any timer is running and if it was started yesterday
    if (timer) {
      if ((new Date(timer.start)).getDate() < time.getDate()) {
        const id = timer._id;
        // stop yesterday's timer
        actions.stopTimer(id, time, timer.start);
        // start today's one
        actions.startTimer(id, time);
        this.createRecord(id);
      }
    }
  }

  /* Record Methods */

  createRecord (timer) {
    const { records } = this.props;
    if (records[timer]) {
      return;
    }
    this.props.actions.createRecord({ timer });
  }

  eraseRecords () {
    this.props.actions.eraseRecords();
  }

  /* Render */

  render () {
    const { timers, records, totals, wastedTime } = this.props;
    const { text, time, month, date, currentMonth, currentDate } = this.state;
    const current = month === currentMonth && date === currentDate;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <DatePicker
            dateString={this.formatDate(month, date)}
            onDateChange={this.onDateChange}
          />
          <MonthTotal
            timers={timers}
            formatTime={this.formatTime}
            totals={totals}
            wastedTime={wastedTime}
          />
          <Form
            text={text}
            onChange={this.onInputChange}
            onClick={this.onButtonClick}
          />
          <TimersList
            timers={timers}
            records={records}
            month={month}
            date={date}
            time={time}
            current={current}
            formatTime={this.formatTime}
            setTimer={this.setTimer}
            deleteTimer={this.deleteTimer}
          />
          <div id="bottom-div">
            <button
              type="button"
              className="btn btn-danger btn-large"
              onClick={this.eraseRecords}
            >
              Clear records
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const totals = {};
  const todayRecords = {};
  const { auth, timers, records } = state;
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();

  let workingDays = date - Math.floor(date / 7) - 1;

  if (date % 7 > time.getDay()) {
    workingDays--;
  }

  let wastedTime = workingDays * 16 * 60 * 60 * 1000;

  if (records.length > 0) {

    const filterRecords = (r => r.timer === timerId && r.month === month);
    const findRecord = (r => (
      r.timer === id && r.month === month && r.date === date
    ));

    const numOfTimers = timers.length;
    let timerId;
    let mRecords = [];
    for (let i = 0; i < numOfTimers; i++) {
      timerId = timers[i]._id;
      totals[timerId] = 0;
      mRecords = records.filter(filterRecords);
      if (mRecords.length) {
        totals[timerId] = mRecords.map(record => record.duration)
        .reduce((total, current) => total + current);
      }
    }

    for (let key in totals) {
      wastedTime -= Math.floor(totals[key]/1000/60)*1000*60;
    }

    let id;
    for (let i = 0; i < numOfTimers; i++) {
      id = timers[i]._id;
      todayRecords[id] = records.find(findRecord) || null;
    }
  }

  let startTime;
  let timer = timers.find(timer => timer.running);
  if (timer) {
    startTime = timer.start;
  }

  return {
    auth,
    timers,
    totals,
    time,
    month,
    date,
    startTime,
    wastedTime,
    records: todayRecords
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, timerActions, recordActions);

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);
