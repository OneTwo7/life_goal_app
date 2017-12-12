import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import moment from 'moment';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.renderGoal = this.renderGoal.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
  }

  onInputChange (event) {
    this.setState({ text: event.target.value });
  }

  onButtonClick (event) {
    const text = this.state.text;

    if (!text) {
      alert('Fill in your goal!');
      return;
    }

    this.props.actions.createGoal({ text });
    this.setState({ text: '' });
  }

  completeGoal (event) {
    const id = this.getGoalId(event.target);
    this.props.actions.completeGoal(id);
  }

  deleteGoal (event) {
    const id = this.getGoalId(event.target);
    this.props.actions.deleteGoal(id);
  }

  renderGoal (goal) {
    return (
      <li key={goal.id} id={goal.id} className="list-group-item">
        <div className="goal-description">
          <div>{goal.text}</div>
          <div>{moment(goal.date).format('MMM Do YYYY')}</div>
        </div>
        <button
          onClick={this.completeGoal}
          className="btn btn-success complete-btn"
        >
          Complete
        </button>
        <button
          onClick={this.deleteGoal}
          className="delete-btn"
        >
          &#x2715;
        </button>
      </li>
    );
  }

  getGoalId (element) {
    return parseFloat(element.parentElement.id);
  }

  render () {
    const { current, past } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Life Goal App</h1>
            <form className="form-inline">
              <input
                type="text"
                value={this.state.text}
                onChange={this.onInputChange}
                name="text"
                className="form-control"
              />
              <button
                type="button"
                onClick={this.onButtonClick}
                className="btn btn-primary"
              >
                Add
              </button>
            </form>
            <div id="goals-list">
              <h2>Current Goals</h2>
              <ul className="list-group">
                {
                  current.map(this.renderGoal)
                }
              </ul>
            </div>
            <div id="completed-list">
              <h2>Completed</h2>
              <ul className="list-group">
                {
                  past.map(this.renderGoal)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const goals = state;
  const current = goals.filter(goal => !goal.completed);
  const past = goals.filter(goal => goal.completed);

  return {
    goals,
    current,
    past
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
