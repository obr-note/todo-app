import React, { FC, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import firebase from 'firebase';

// import { TodoState, TodoItemState } from '../../reducer';
import Home from '../../components/pages/Home';

const EnhancedHome: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  // const content = useSelector<TodoState, { [key: number]: TodoItemState }>(
  //   (state) => state.content,
  // );
  const [content, setContent] = useState<{ id: number; title: string }[]>([]);
  useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      firebaseApp
        .database()
        .ref('sample/')
        .orderByKey()
        .limitToFirst(10)
        .on('value', (snapshot) => {
          console.log(snapshot);
          const newState: { id: number; title: string }[] = [];
          snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
            const { key } = childSnapshot;
            const title = childSnapshot.child('title');
            if (typeof key === 'string' && typeof title === 'string') {
              newState.push({
                id: parseInt(key, 10),
                title,
              });
            }
          });
          setContent(newState);
        });
    }
  }, [firebaseApp]);

  return (
    <>
      <Home content={content} />
    </>
  );
};

export default EnhancedHome;
