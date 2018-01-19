import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timerActions from '../../actions/timerActions';
import * as recordActions from '../../actions/recordActions';
import Form from '../common/Form';
import initialState from '../../initialState';

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
      durations: {},
      month,
      date
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.eraseRecords = this.eraseRecords.bind(this);
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000);
    this.setDurations(this.state.month, this.state.date, this.props.timers, this.props.records);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.timers !== this.props.timers) {
      this.setDurations(this.state.month, this.state.date, this.props.timers, nextProps.records);
    }
  }

  getDate () {
    const date = new Date();
    return date.getTime();
  }

  formatTime (time) {
    if (isNaN(time)) {
      return '00:00:00';
    }
    const seconds = Math.floor(time/1000%60);
    const minutes = Math.floor(time/1000/60%60);
    const hours = Math.floor(time/1000/60/60);
    return this.l0(hours) + ':' + this.l0(minutes) + ':' + this.l0(seconds);
  }

  l0 (num) {
    return num < 10 ? '0' + num : num;
  }

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

  deleteTimer (event) {
    const id = this.getTimerId(event.target);
    this.props.actions.deleteTimer(id);
  }

  setTimer (event) {
    const element = event.target;
    const id = this.getTimerId(element);
    const text = element.innerHTML;

    if (text === 'Start') {
      this.props.actions.startTimer(id, this.state.time);
    } else {
      this.props.actions.stopTimer(id, this.state.time);
      this.setRecord(id);
    }
  }

  getTimerId (element) {
    return parseFloat(element.parentElement.id);
  }

  selectMonth (event) {
    const month = parseInt(event.target.id.slice(6), 10);
    const days = this.props.days.slice(0, this.props.months[month].length);
    const date = month === this.state.currentMonth ? this.state.currentDate : 1;
    this.setState({ month, days });
    this.setDate(date);
  }

  selectDate (event) {
    const date = parseInt(event.target.id.slice(4), 10);
    this.setDate(date);
  }

  setDate (date) {
    this.setState({ date });
    this.setDurations(this.state.month, date, this.props.timers, this.props.records);
  }

  setRecord (timerId) {
    let record = null;
    const { records } = this.props;

    if (records[this.state.month]) {
      if (records[this.state.month][this.state.date]) {
        if (records[this.state.month][this.state.date][timerId]) {
          record = records[this.state.month][this.state.date][timerId];
        }
      }
    }

    if (record) {
      this.props.actions.updateRecord(record, this.state.time);
    } else {
      this.props.actions.createRecord({ timerId }, this.state.time);
    }
  }

  eraseRecords () {
    this.props.actions.eraseRecords();
  }

  setDurations (month, date, timers, records) {
    let durations = {};
    timers.forEach(timer => {
      if (records[month] && records[month][date] && records[month][date][timer.id]) {
        durations[timer.id] = records[month][date][timer.id].duration;
      } else {
        durations[timer.id] = 0;
      }
    });
    this.setState({ durations });
  }

  render () {
    const { timers, months } = this.props;
    const durations = this.state.durations;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <section className="months">
            {
              months.map((month, idx) => (
                <button
                  id={'month_' + idx}
                  className={idx === this.state.month ? 'month active' : 'month'}
                  key={idx}
                  type="button"
                  onClick={this.selectMonth}
                >
                  {month.name}
                </button>
              ))
            }
          </section>
          <section className="days">
            {
              this.state.days.map(day => (
                <button
                  id={'day_' + day}
                  key={day}
                  className={day === this.state.date ? 'day active' : 'day'}
                  type="button"
                  onClick={this.selectDate}
                >
                  {day}
                </button>
              ))
            }
          </section>
          <Form
            text={this.state.text}
            onChange={this.onInputChange}
            onClick={this.onButtonClick}
          />
          {
            timers.map(timer => (
              <div key={timer.id} id={timer.id} className="timer">
                <span>{timer.text}</span>
                {
                  timer.running &&
                  <span>
                    {this.formatTime(durations[timer.id] + (Date.parse(this.state.time) - Date.parse(timer.start)))}
                  </span>
                }
                {
                  !timer.running &&
                  <span>{this.formatTime(durations[timer.id])}</span>
                }
                <button onClick={this.setTimer} className="btn">
                  {timer.running ? 'Stop' : 'Start'}
                </button>
                <button onClick={this.deleteTimer} className="btn">
                  delete
                </button>
              </div>
            ))
          }
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.eraseRecords}
          >
            Erase records
          </button>
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
