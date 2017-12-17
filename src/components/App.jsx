import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import GoalForm from './GoalForm';
import GoalsList from './GoalsList';
import GoalListItem from './GoalListItem';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.clearGoals = this.clearGoals.bind(this);
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

  clearGoals () {
    this.props.actions.clearGoals();
  }

  renderGoals (goals, completed) {
    return goals.map(goal => {
      return (
        <GoalListItem
          key={goal.id}
          goal={goal}
          completed={completed}
          completeGoal={this.completeGoal}
          deleteGoal={this.deleteGoal}
        />
      );
    });
  }

  getGoalId (element) {
    return parseFloat(element.parentElement.id);
  }

  render () {
    const { current, past, currentProps, pastProps } = this.props;
    currentProps.renderGoals = this.renderGoals;
    pastProps.renderGoals = this.renderGoals;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Life Goal App</h1>
            <GoalForm
              text={this.state.text}
              onChange={this.onInputChange}
              onClick={this.onButtonClick}
            />
            {current.length > 0 && <GoalsList {...currentProps} />}
            {past.length > 0 && <GoalsList {...pastProps} />}
            <div id="bottom-div">
              <button
                className="btn btn-danger btn-large"
                onClick={this.clearGoals}
              >
                Clear Goals
              </button>
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
  const currentProps = {
    goals: current,
    completed: false,
    id: 'goals-list',
    header: 'Current Goals'
  };
  const pastProps = {
    goals: past,
    completed: true,
    id: 'completed-list',
    header: 'Completed'
  };

  return {
    goals,
    current,
    past,
    currentProps,
    pastProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
