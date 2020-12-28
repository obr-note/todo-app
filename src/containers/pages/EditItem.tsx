import React, { FC, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Navigate } from 'react-router';

import { TodoState, TodoItemState } from '../../reducer';
import { updateItem } from '../../actions';
import EditItem from '../../components/pages/EditItem';

const EnhancedEditItem: FC = () => {
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
    (state) => state.content,
  );
  const contentItemIds = Object.keys(content);

  if (contentItemIds.includes(itemId)) {
    const { title, body } = content[Number(itemId)];
    const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputTitle.current && inputBody.current) {
        dispatch(
          updateItem(
            Number(itemId),
            inputTitle.current.value,
            inputBody.current.value,
          ),
        );
        navigate('/');
      }
    };

    return (
      <EditItem
        title={title}
        body={body}
        inputTitle={inputTitle}
        inputBody={inputBody}
        onSubmitFunc={onSubmitFunc}
      />
    );
  }

  return <Navigate to="/" replace />;
};

export default EnhancedEditItem;
