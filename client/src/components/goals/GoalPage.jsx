import React from 'react';
import Goals from './Goals';
import Form from '../common/Form';
import GoalWrapper from './GoalWrapper';
import GoalList from './GoalList';
import GoalListItem from './GoalListItem';
import ClearGoalsButton from './ClearGoalsButton';

export default () => (
  <Goals>
    <Form />
    <GoalWrapper>
      <GoalList>
        <GoalListItem />
      </GoalList>
      <ClearGoalsButton />
    </GoalWrapper>
  </Goals>
);
