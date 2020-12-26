import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import ItemDetails from '../../components/pages/ItemDetails';
import { TodoState, TodoItemState } from '../../reducer';

const EnhancedItemDetails: FC = () => {
  const { itemId } = useParams();
  const content = useSelector<TodoState, TodoItemState[]>(
    (state) => state.content,
  );
  const contentItem = content.find((element) => element.id === Number(itemId));
  if (typeof contentItem !== 'undefined') {
    return <ItemDetails item={contentItem} />;
  }

  return <Navigate to="/" replace />;
};

export default EnhancedItemDetails;
