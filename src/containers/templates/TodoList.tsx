// import React, { FC } from 'react';
import React, { FC, useState } from 'react';
import TodoList from '../../components/templates/TodoList';

const EnhancedTodoList: FC = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState<{ id: number; text: string }[]>([]);
  const add = (): void => {
    setState([...state, { id: count, text: 'おはよう' }]);
    setCount((c) => c + 1);
  };
  // const data: { id: number; text: string }[] = [
  //   { id: 1, text: 'おはようございます' },
  //   { id: 2, text: 'おっはー' },
  //   { id: 3, text: 'おはようございます' },
  // ];

  return (
    <>
      {state.map((item) => (
        <TodoList key={item.id} text={item.text} />
      ))}
      <button onClick={add} type="button">
        押してね
      </button>
    </>
  );
};

export default EnhancedTodoList;
