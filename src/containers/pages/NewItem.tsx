import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addItem } from '../../actions';
import NewItem from '../../components/pages/NewItem';

const EnhancedNewItem: FC = () => {
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputTitle.current && inputBody.current) {
      dispatch(addItem(inputTitle.current.value, inputBody.current.value));
      navigate('/');
    }
  };

  return (
    <>
      <NewItem
        inputTitle={inputTitle}
        inputBody={inputBody}
        onSubmitFunc={onSubmitFunc}
      />
    </>
  );
};

export default EnhancedNewItem;
