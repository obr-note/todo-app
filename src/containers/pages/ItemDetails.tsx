import React, { FC, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { useParams, useNavigate, Navigate } from 'react-router-dom';
import firebase from 'firebase';

import ItemDetails from '../../components/pages/ItemDetails';
// import { deleteItem } from '../../actions';
// import { TodoState, TodoItemState } from '../../reducer';
import { ItemState, initailItemState } from '../../data/Item';

const EnhancedItemDetails: FC<{
  firebaseApp: firebase.app.App | undefined;
}> = ({ firebaseApp }) => {
  const { itemId } = useParams();
  // const dispatch = useDispatch();
  const [item, setItem] = useState<ItemState>(initailItemState);
  const navigate = useNavigate();
  // const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
  //   (state) => state.content,
  // );
  useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      firebaseApp
        .database()
        .ref(`items/${itemId}/`)
        .once('value')
        .then((snapshot) => {
          const { key } = snapshot;
          // eslint-disable-next-line
          const { title, body, createdAt, updatedAt } = snapshot.val();
          if (
            typeof key === 'string' &&
            typeof title === 'string' &&
            typeof body === 'string' &&
            typeof createdAt === 'number' &&
            typeof updatedAt === 'number'
          ) {
            setItem({
              id: parseInt(key, 10),
              title,
              body,
              createdAt,
              updatedAt,
            });
          } else {
            navigate('/');
          }
        })
        .catch(() => {
          alert('Synchronization failed');
        });
    }
  }, [firebaseApp, itemId, navigate]);

  const deleteFunc = () => {
    if (typeof firebaseApp !== 'undefined') {
      firebaseApp
        .database()
        .ref(`items/${itemId}/`)
        .remove()
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          alert('Remove failed');
        });
    }
  };

  return (
    <ItemDetails
      itemId={itemId}
      title={item.title}
      body={item.body}
      createdAt={item.createdAt}
      updatedAt={item.updatedAt}
      deleteFunc={deleteFunc}
    />
  );
  // const contentItemIds = Object.keys(content);

  // if (contentItemIds.includes(itemId)) {
  //   const { title, body, createdAt, updatedAt } = content[Number(itemId)];
  //   const deleteFunc = () => {
  //     dispatch(deleteItem(Number(itemId)));
  //     navigate('/');
  //   };

  //   return (
  //     <ItemDetails
  //       itemId={itemId}
  //       title={title}
  //       body={body}
  //       createdAt={createdAt}
  //       updatedAt={updatedAt}
  //       deleteFunc={deleteFunc}
  //     />
  //   );
  // }

  // return <Navigate to="/" replace />;
};

export default EnhancedItemDetails;
