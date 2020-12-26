import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import ItemDetails from '../../components/pages/ItemDetails';
import { deleteItem } from '../../actions';
import { TodoState, TodoItemState } from '../../reducer';

const EnhancedItemDetails: FC = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const content = useSelector<TodoState, TodoItemState[]>(
    (state) => state.content,
  );
  const contentItem = content.find((element) => element.id === Number(itemId));
  const deleteFunc = () => {
    dispatch(deleteItem(Number(itemId)));
  };
  if (typeof contentItem !== 'undefined') {
    return <ItemDetails item={contentItem} deleteFunc={deleteFunc} />;
  }

  return <Navigate to="/" replace />;
};

export default EnhancedItemDetails;
