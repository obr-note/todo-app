import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addItem } from '../../actions';
import NewItem from '../../components/pages/NewItem';

const EnhancedNewItem: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialInputContent = { title: '', body: '' };
  const [inputContent, setInputContent] = useState<{
    title: string;
    body: string;
  }>(initialInputContent);
  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { title, body } = inputContent;
    if (event.target.id === 'title') {
      title = event.target.value;
    } else if (event.target.id === 'body') {
      body = event.target.value;
    }
    setInputContent({ title, body });
  };
  const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, body } = inputContent;
    dispatch(addItem(title, body));
    navigate('/');
  };
  const onResetFunc = () => {
    setInputContent(initialInputContent);
  };

  return (
    <>
      <NewItem
        onChangeFunc={onChangeFunc}
        onSubmitFunc={onSubmitFunc}
        onResetFunc={onResetFunc}
      />
    </>
  );
};

export default EnhancedNewItem;
