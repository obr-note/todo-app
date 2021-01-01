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
        .ref('content/')
        .on('value', (snapshot) => {
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
