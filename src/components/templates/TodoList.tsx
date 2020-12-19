import React, { FC } from 'react';

type Props = {
  text: string;
};

const TodoList: FC<Props> = ({ text }) => <p>{text}</p>;

export default TodoList;
