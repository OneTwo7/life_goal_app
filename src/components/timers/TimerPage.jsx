import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/timerActions';
import Form from '../common/Form';
import initialState from '../../initialState';

class TimerPage extends React.Component {
  constructor (props) {
    super(props);

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();

    this.state = {
      text: '',
      time: date,
      days: props.days.slice(0, props.months[month].length),
      currentMonth: month,
      currentDay: day,
      month,
      day
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectDay = this.selectDay.bind(this);
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  getDate () {
    const date = new Date();
    return date.getTime();
  }

  formatTime (time) {
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
    }
  }

  getTimerId (element) {
    return parseFloat(element.parentElement.id);
  }

  selectMonth (event) {
    const month = parseInt(event.target.id.slice(6), 10);
    const days = this.props.days.slice(0, this.props.months[month].length);
    const day = month === this.state.currentMonth ? this.state.currentDay : 1;
    this.setState({ month, days, day });
  }

  selectDay (event) {
    const day = parseInt(event.target.id.slice(4), 10);
    this.setState({ day });
  }

  render () {
    const { timers, months } = this.props;

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
                  className={day === this.state.day ? 'day active' : 'day'}
                  type="button"
                  onClick={this.selectDay}
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
                    {this.formatTime(timer.duration + (Date.parse(this.state.time) - Date.parse(timer.start)))}
                  </span>
                }
                {
                  !timer.running &&
                  <span>{this.formatTime(timer.duration)}</span>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const months = initialState.months;
  const timers = state.timers;
  let days = [];
  for (let i = 0; i <= 30; i++) {
    days[i] = i + 1;
  }

  return {
    months,
    timers,
    days
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage);
