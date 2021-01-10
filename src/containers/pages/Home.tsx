import React, { FC, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

// import { TodoState, TodoItemState } from '../../reducer';
import Home from '../../components/pages/Home';

const EnhancedHome: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  // const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
  //   (state) => state.content,
  // );
  const [items, setItems] = useState<{ id: number; title: string }[]>([]);
  useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      const onValueChange = (snapshot: firebase.database.DataSnapshot) => {
        const newState: { id: number; title: string }[] = [];
        snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
          const { key } = childSnapshot;
          // eslint-disable-next-line
          const title = childSnapshot.child('title').val();
          if (typeof key === 'string' && typeof title === 'string') {
            newState.push({
              id: parseInt(key, 10),
              title,
            });
          }
        });
        setItems(newState);
      };
      firebaseApp.database().ref('items/').on('value', onValueChange);

      return () => {
        firebaseApp.database().ref('items/').off('value', onValueChange);
      };
    }

    return () => {
      console.log('firebaseApp is undefined');
    };
  }, [firebaseApp]);

  return (
    <>
      <Home items={items} />
    </>
  );
};

export default EnhancedHome;
