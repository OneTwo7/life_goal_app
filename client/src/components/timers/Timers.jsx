import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timerActions from '../../actions/timerActions';
import * as recordActions from '../../actions/recordActions';
import * as helpers from '../../utils/helpers';

class Timers extends React.Component {
  constructor (props) {
    super(props);

    const { time } = props;

    this.state = {
      time,
      month: time.getMonth(),
      date: time.getDate(),
      text: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearRecords = this.clearRecords.bind(this);
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
    const { auth } = this.props;
    if (auth && auth._id) {
      this.props.actions.getRecords();
    }
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

  /* Date Methods */

  onDateChange (event) {
    const { target: { value } } = event;
    if (value) {
      const ymd = value.split('-');
      const month = ymd[1] - 1;
      const date = +ymd[2];
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
    const { timer, actions } = this.props;

    if (text === 'Start') {
      this.startTimer(id);
    } else {
      const startTime = timer.start;
      actions.stopTimer(id, startTime);
    }
  }

  deleteTimer (event) {
    const id = this.getTimerId(event.target);
    this.props.actions.deleteTimer(id);
  }

  getTimerId (element) {
    let parent = element.parentElement;
    while (parent.className.indexOf('list-group-item') === -1) {
      parent = parent.parentElement;
    }
    return parent.id;
  }

  startTimer (id) {
    this.props.actions.startTimer(id);
    this.createRecord(id);
  }

  reloadTimers () {
    const { timer, actions } = this.props;
    // check whether any timer is running and was it started yesterday
    if (timer) {
      if ((new Date(timer.start)).getDate() < (new Date()).getDate()) {
        const id = timer._id;
        // stop yesterday's timer
        actions.stopTimer(id, timer.start);
        // start today's one
        this.startTimer(id);
      }
    }
  }

  /* Record Methods */

  createRecord (timerId) {
    const { records } = this.props;
    const { time } = this.state;
    const month = time.getMonth();
    const date = time.getDate();
    const record = records.find(r => (
      r.timer === timerId && r.month === month && r.date === date
    ));
    if (record) {
      return;
    }
    this.props.actions.createRecord({ timer: timerId });
  }

  clearRecords () {
    this.props.actions.eraseRecords();
  }

  /* Render */

  render () {
    const { timers } = this.props;
    const { time, month, date } = this.state;
    const current = month === time.getMonth() && date === time.getDate();
    const { formatTime, formatDate } = helpers;

    const children = React.Children.map(this.props.children, (child, idx) => {
      let childProps;

      if (idx === 0) {
        childProps = {
          dateString: formatDate(time.getFullYear(), month, date),
          onDateChange: this.onDateChange
        };
      } else if (idx === 1) {
        childProps = {
          timers,
          formatTime,
          totals: this.props.totals,
          wastedTime: this.props.wastedTime
        };
      } else if (idx === 2) {
        childProps = {
          text: this.state.text,
          onChange: this.onInputChange,
          onClick: this.onButtonClick
        };
      } else {
        childProps = {
          timers,
          current,
          month,
          date,
          time,
          formatTime,
          records: this.props.records,
          setTimer: this.setTimer,
          deleteTimer: this.deleteTimer,
          clearRecords: this.clearRecords
        };
      }

      return React.cloneElement(child, childProps);
    });

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, timers, records } = state;
  const { getTotals, getWasted } = helpers;
  const timer = timers.find(timer => timer.running);
  const time = new Date();
  const totals = getTotals(records, time, timers);
  const wastedTime = getWasted(time, totals);

  return {
    auth,
    timer,
    timers,
    totals,
    time,
    wastedTime,
    records
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, timerActions, recordActions);

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
