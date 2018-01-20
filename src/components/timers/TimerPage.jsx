import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timerActions from '../../actions/timerActions';
import * as recordActions from '../../actions/recordActions';
import Form from '../common/Form';
import initialState from '../../initialState';
import Months from './Months';
import Days from './Days';
import TimersList from './TimersList';

class TimerPage extends React.Component {
  constructor (props) {
    super(props);

    const currentTime = new Date();
    const month = currentTime.getMonth();
    const date = currentTime.getDate();

    this.state = {
      text: '',
      time: currentTime,
      days: props.days.slice(0, props.months[month].length),
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
    this.selectMonth = this.selectMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
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

  selectMonth (event) {
    const month = parseInt(event.target.id.slice(6), 10);
    const days = this.props.days.slice(0, this.props.months[month].length);
    const date = month === this.state.currentMonth ? this.state.currentDate : 1;
    this.setState({ month, days, date });
  }

  selectDate (event) {
    const date = parseInt(event.target.id.slice(4), 10);
    this.setState({ date });
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
    if (records[this.state.month] &&
        records[this.state.month][this.state.date] &&
        records[this.state.month][this.state.date][timerId]) {
      return;
    }
    this.props.actions.createRecord({ timerId }, this.state.time);
  }

  updateRecord (timerId) {
    const { records } = this.props;
    const record = records[this.state.month][this.state.date][timerId];
    this.props.actions.updateRecord(record, this.state.time);
  }

  eraseRecords () {
    this.props.actions.eraseRecords();
  }

  /* Render */

  render () {
    const { timers, records, months } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Months
            months={months}
            selectedMonth={this.state.month}
            selectMonth={this.selectMonth}
          />
          <Days
            days={this.state.days}
            selectedDate={this.state.date}
            selectDate={this.selectDate}
          />
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
  const months = initialState.months;
  let days = [];
  for (let i = 0; i <= 30; i++) {
    days[i] = i + 1;
  }

  return {
    timers: state.timers,
    records: state.records,
    months,
    days
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, timerActions, recordActions);

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);
