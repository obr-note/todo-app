import React, { FC, useState } from 'react';
import Home from '../../components/pages/Home';

const EnhancedHome: FC = () => {
  const [input, setInput] = useState<{ firstName: string; lastName: string }>({
    firstName: '',
    lastName: '',
  });
  const [count, setCount] = useState(0);
  const [content, setContent] = useState<{ id: number; text: string }[]>([]);
  const addFunction = () => {
    setContent([...content, { id: count, text: 'おはよう' }]);
    setCount((c) => c + 1);
  };
  // const handleChange = (e) => {
  //   setInput(e.target.value);
  // };
  const onSubmitFunction = () => {
    setContent([
      ...content,
      { id: count, text: input.firstName + input.lastName },
    ]);
    setCount((c) => c + 1);
  };
  const onChangeFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { firstName, lastName } = input;
    if (event.target.id === 'firstName') {
      firstName = event.target.value;
    } else if (event.target.id === 'lastName') {
      lastName = event.target.value;
    }
    setInput({ firstName, lastName });
  };

  return (
    <>
      <Home
        content={content}
        addFunction={addFunction}
        onChangeFunction={onChangeFunction}
        onSubmitFunction={onSubmitFunction}
      />
    </>
  );
};

export default EnhancedHome;
