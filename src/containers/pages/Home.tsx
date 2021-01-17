import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Home from '../../components/pages/Home';

const EnhancedHome: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const [items, setItems] = React.useState<{ id: number; title: string }[]>([]);
  console.log('rendering component');
  React.useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      console.log('rendering firebaseapp');
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
