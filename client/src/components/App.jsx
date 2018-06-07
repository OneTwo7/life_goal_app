import React from 'react';
import { withRouter, Route } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/authActions';
import { loadGoals } from '../actions/goalActions';
import { loadTimers } from '../actions/timerActions';
import Header from './common/Header';
import HomePage from './home/HomePage';
import GoalPage from './goals/GoalPage';
import TimerPage from './timers/TimerPage';

class App extends React.Component {
  componentDidMount () {
    this.props.fetchUser();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth !== this.props.auth) {
      if (nextProps.auth._id) {
        const { history } = this.props;
        this.props.loadGoals();
        this.props.loadTimers();
        if (history.location.pathname === '/') {
          history.push('/goals');
        }
      }
    }
  }

  render () {
    const { auth } = this.props;

    return (
      <div className="container">
        <h1>Life Goal App</h1>
        <Header auth={auth} />
        <HomePage auth={auth} />
        {
          auth && auth._id &&
          [
            <Route key="goals-link" path="/goals" component={GoalPage} />,
            <Route key="timers-link" path="/timers" component={TimerPage} />
          ]
        }
        <hr />
        <footer>
          <p>&copy; 2018 Ivan Antonov</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchUser, loadGoals, loadTimers
})(App));
