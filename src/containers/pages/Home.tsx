import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { TodoState, TodoItemState } from '../../reducer';
import Home from '../../components/pages/Home';

const EnhancedHome: FC = () => {
  const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
    (state) => state.content,
  );

  return (
    <>
      <Home content={content} />
    </>
  );
};

export default EnhancedHome;
