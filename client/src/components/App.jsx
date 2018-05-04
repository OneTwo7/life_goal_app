import React from 'react';
import { withRouter, Route } from 'react-router';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/authActions';
import Header from './common/Header';
import GoalPage from './goals/GoalPage';
import TimerPage from './timers/TimerPage';

class App extends React.Component {
  componentDidMount () {
    this.props.fetchUser();
  }

  render () {
    console.log('auth', this.props.auth);

    return (
      <div className="container">
        <h1>Life Goal App</h1>
        <Header auth={this.props.auth} />
        <Route exact path="/" component={GoalPage} />
        <Route path="/timers" component={TimerPage} />
        <hr />
        <footer>
          <p>&copy; 2018 Ivan Antonov</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {
    auth
  };
};

export default withRouter(connect(mapStateToProps, { fetchUser })(App));
