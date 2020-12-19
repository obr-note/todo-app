import React, { FC } from 'react';
import TodoList from '../../components/templates/TodoList';

const EnhancedTodoList: FC = () => {
  // const data: { text: string }[] = [
  //   { text: 'おはようございます' },
  //   { text: 'おっはー' },
  //   { text: 'おはようございます' },
  // ];

  return (
    <>
      <TodoList text="おはようございます" />
      <TodoList text="おっはー" />
      <TodoList text="おはようございます" />
    </>
  );
};

export default EnhancedTodoList;
