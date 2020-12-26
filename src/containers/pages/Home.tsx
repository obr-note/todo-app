import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../actions';
import { TodoState } from '../../reducer';
import Home from '../../components/pages/Home';

const EnhancedHome: FC = () => {
  const content = useSelector<TodoState, { id: number; text: string }[]>(
    (state) => state.content,
  );
  const dispatch = useDispatch();
  const [inputContent, setInputContent] = useState<string>('');
  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent(event.target.value);
  };
  const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addItem(inputContent));
  };
  const onResetFunc = () => {
    setInputContent('');
  };
  // const [input, setInput] = useState<{ firstName: string; lastName: string }>({
  //   firstName: '',
  //   lastName: '',
  // });
  // const [count, setCount] = useState(0);
  // const [content, setContent] = useState<{ id: number; text: string }[]>([]);
  // const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let { firstName, lastName } = input;
  //   if (event.target.id === 'firstName') {
  //     firstName = event.target.value;
  //   } else if (event.target.id === 'lastName') {
  //     lastName = event.target.value;
  //   }
  //   setInput({ firstName, lastName });
  // };
  // const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setContent([
  //     ...content,
  //     { id: count, text: input.firstName + input.lastName },
  //   ]);
  //   setCount((c) => c + 1);
  // };
  // const onResetFunc = () => {
  //   setInput({ firstName: '', lastName: '' });
  // };

  return (
    <>
      <Home
        content={content}
        onChangeFunc={onChangeFunc}
        onSubmitFunc={onSubmitFunc}
        onResetFunc={onResetFunc}
      />
      {/* <Home
        content={content}
        onChangeFunc={onChangeFunc}
        onSubmitFunc={onSubmitFunc}
        onResetFunc={onResetFunc}
      /> */}
    </>
  );
};

export default EnhancedHome;
