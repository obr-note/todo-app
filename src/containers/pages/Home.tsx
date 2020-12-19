import React, { FC, useState } from 'react';
import Home from '../../components/pages/Home';

const EnhancedHome: FC = () => {
  const [count, setCount] = useState(0);
  const [content, setContent] = useState<{ id: number; text: string }[]>([]);
  const addFunction = () => {
    setContent([...content, { id: count, text: 'おはよう' }]);
    setCount((c) => c + 1);
  };

  return (
    <>
      <Home content={content} addFunction={addFunction} />
    </>
  );
};

export default EnhancedHome;
