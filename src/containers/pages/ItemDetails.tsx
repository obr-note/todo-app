import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

import ItemDetails from '../../components/pages/ItemDetails';
import { deleteItem } from '../../actions';
import { TodoState, TodoItemState } from '../../reducer';

const EnhancedItemDetails: FC = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
    (state) => state.content,
  );
  const contentItemIds = Object.keys(content);

  if (contentItemIds.includes(itemId)) {
    const { title, body, createdAt, updatedAt } = content[Number(itemId)];
    const deleteFunc = () => {
      dispatch(deleteItem(Number(itemId)));
      navigate('/');
    };

    return (
      <ItemDetails
        itemId={itemId}
        title={title}
        body={body}
        createdAt={createdAt}
        updatedAt={updatedAt}
        deleteFunc={deleteFunc}
      />
    );
  }

  return <Navigate to="/" replace />;
};

export default EnhancedItemDetails;
