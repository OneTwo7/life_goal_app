import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/goalActions';

class Goals extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
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

    this.props.createGoal({ text });
    this.setState({ text: '' });
  }

  completeGoal (event) {
    const id = this.getGoalId(event.target);
    this.props.completeGoal(id);
  }

  deleteGoal (event) {
    const id = this.getGoalId(event.target);
    this.props.deleteGoal(id);
  }

  clearGoals () {
    this.props.clearGoals();
  }

  getGoalId (element) {
    return element.parentElement.id;
  }

  render () {
    const children = React.Children.map(this.props.children, (child, idx) => {
      if (idx === 0) {
        return React.cloneElement(child, {
          text: this.state.text,
          onChange: this.onInputChange,
          onClick: this.onButtonClick
        });
      } else {
        return React.cloneElement(child, {
          goals: this.props.goals,
          completeGoal: this.completeGoal,
          deleteGoal: this.deleteGoal,
          clearGoals: this.clearGoals
        });
      }
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
  const { auth, goals: allGoals } = state;

  let goals = [];

  if (auth && auth._id) {
    goals = allGoals.filter(goal => goal.user === auth._id);
  }

  return {
    goals
  };
}

export default connect(mapStateToProps, actions)(Goals);
