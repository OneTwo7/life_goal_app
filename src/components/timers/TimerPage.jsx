import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timerActions from '../../actions/timerActions';
import * as recordActions from '../../actions/recordActions';
import Form from '../common/Form';
import TimersList from './TimersList';
import moment from 'moment';

class TimerPage extends React.Component {
  constructor (props) {
    super(props);

    const currentTime = new Date();
    const month = currentTime.getMonth();
    const date = currentTime.getDate();

    this.state = {
      text: '',
      time: currentTime,
      currentMonth: month,
      currentDate: date,
      month,
      date
    }

    this.formatTime = this.formatTime.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.eraseRecords = this.eraseRecords.bind(this);
  }

  /* Lifecycle Methods */

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  /* Time Format Methods */

  formatTime (time) {
    if (isNaN(time)) {
      return '00:00:00';
    }
    if (time < 0) {
      time += 1000;
    }
    const seconds = Math.floor(time/1000%60);
    const minutes = Math.floor(time/1000/60%60);
    const hours = Math.floor(time/1000/60/60);
    return this.l0(hours) + ':' + this.l0(minutes) + ':' + this.l0(seconds);
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

    this.props.actions.createTimer({ text });
    this.setState({ text: '' });
  }

  /* Timer Methods */

  setTimer (event) {
    const element = event.target;
    const id = this.getTimerId(element.parentElement);
    const text = element.innerHTML;

    if (text === 'Start') {
      this.props.actions.startTimer(id, this.state.time);
      this.createRecord(id);
    } else {
      this.props.actions.stopTimer(id, this.state.time);
      this.updateRecord(id);
    }
  }

  deleteTimer (event) {
    const id = this.getTimerId(event.target);
    this.props.actions.deleteTimer(id);
  }

  getTimerId (element) {
    return parseFloat(element.parentElement.id);
  }

  /* Record Methods */

  createRecord (timerId) {
    const { records } = this.props;
    if (records[timerId] &&
        records[timerId][this.state.month] &&
        records[timerId][this.state.month][this.state.date]) {
      return;
    }
    this.props.actions.createRecord({ timerId }, this.state.time);
  }

  updateRecord (timerId) {
    const { records } = this.props;
    const record = records[timerId][this.state.month][this.state.date];
    this.props.actions.updateRecord(record, this.state.time);
  }

  eraseRecords () {
    this.props.actions.eraseRecords();
  }

  /* Render */

  render () {
    const { timers, records, totals } = this.props;
    const dateString = this.formatDate(this.state.month, this.state.date);

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form id="date-picker-form">
            <div>{moment(dateString).format('MMMM Do')}</div>
            <div>
              <input
                value={dateString}
                id="date-picker"
                className="form-control"
                type="date"
                onChange={this.onDateChange}
              />
              </div>
          </form>
          <div id="month-total" className="card bg-light">
            <div className="card-header">Month's total</div>
            <div className="card-body">
              {
                timers.map(timer => (
                  <div key={timer.id} className="timer-total">
                    <div>{timer.text}</div>
                    <div>
                      {this.formatTime(totals[timer.id][this.state.month])}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <Form
            text={this.state.text}
            onChange={this.onInputChange}
            onClick={this.onButtonClick}
          />
          <TimersList
            timers={timers}
            records={records}
            month={this.state.month}
            date={this.state.date}
            time={this.state.time}
            currentMonth={this.state.currentMonth}
            currentDate={this.state.currentDate}
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
  const numOfTimers = state.timers.length;
  let timerId;
  for (let i = 0; i < numOfTimers; i++) {
    timerId = state.timers[i].id;
    totals[timerId] = {};
    if (state.records[timerId]) {
      for (let month = 0; month < 12; month++) {
        if (state.records[timerId][month]) {
          for (let date = 1; date <= 31; date++) {
            if (state.records[timerId][month][date]) {
              if (totals[timerId][month]) {
                totals[timerId][month] += state.records[timerId][month][date].duration;
              } else {
                totals[timerId][month] = state.records[timerId][month][date].duration;
              }
            }
          }
        } else {
          totals[timerId][month] = 0;
        }
      }
    } else {
      for (let month = 0; month < 12; month++) {
        totals[timerId][month] = 0;
      }
    }
  }

  return {
    timers: state.timers,
    records: state.records,
    totals
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, timerActions, recordActions);

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);
