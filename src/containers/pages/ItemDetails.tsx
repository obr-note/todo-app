import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ItemDetails from '../../components/pages/ItemDetails';
import { TodoState, TodoItemState } from '../../reducer';

const EnhancedItemDetails: FC = () => {
  const { itemId } = useParams();
  const item = useSelector<TodoState, TodoItemState>((state) => {
    const contentArray = state.content;

    return (
      contentArray.find((element) => element.id === Number(itemId)) || {
        id: 0,
        title: '',
        body: '',
        createdAt: 0,
        updatedAt: 0,
      }
    );
  });

  return <ItemDetails item={item} />;
};

export default EnhancedItemDetails;
