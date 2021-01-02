import React, { FC, useRef, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams, Navigate } from 'react-router';
import { useNavigate, useParams } from 'react-router';
import firebase from 'firebase';

// import { TodoState, TodoItemState } from '../../reducer';
// import { updateItem } from '../../actions';
import EditItem from '../../components/pages/EditItem';
import { ItemState, initailItemState } from '../../data/Item';

const EnhancedEditItem: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState<ItemState>(initailItemState);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { itemId } = useParams();
  useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      firebaseApp
        .database()
        .ref(`items/${itemId}/`)
        .on('value', (snapshot) => {
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
        });
    }
  }, [firebaseApp, itemId, navigate]);
  const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      inputTitle.current &&
      inputBody.current &&
      typeof firebaseApp !== 'undefined'
    ) {
      firebaseApp
        .database()
        .ref(`items/${itemId}`)
        .set({
          id: itemId,
          title: inputTitle.current.value,
          body: inputBody.current.value,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          alert('Synchronization failed');
        });
    }
  };

  return (
    <EditItem
      title={item.title}
      body={item.body}
      inputTitle={inputTitle}
      inputBody={inputBody}
      onSubmitFunc={onSubmitFunc}
    />
  );
  // const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
  //   (state) => state.content,
  // );
  // const contentItemIds = Object.keys(content);

  // if (contentItemIds.includes(itemId)) {
  //   const { title, body } = content[Number(itemId)];
  //   const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     if (inputTitle.current && inputBody.current) {
  //       dispatch(
  //         updateItem(
  //           Number(itemId),
  //           inputTitle.current.value,
  //           inputBody.current.value,
  //         ),
  //       );
  //       navigate('/');
  //     }
  //   };

  //   return (
  //     <EditItem
  //       title={title}
  //       body={body}
  //       inputTitle={inputTitle}
  //       inputBody={inputBody}
  //       onSubmitFunc={onSubmitFunc}
  //     />
  //   );
  // }

  // return <Navigate to="/" replace />;
};

export default EnhancedEditItem;
