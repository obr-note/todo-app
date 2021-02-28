import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

import Home from '../../components/pages/Home';
import { AppState, PostState, AppSlice } from '../../reducer';

const EnhancedHome: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const [posts, setPosts] = React.useState<PostState[]>([]);
  const postsData = useSelector<AppState, PostState[]>((state) => state.posts);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setPosts(postsData);
  }, [postsData]);
  React.useEffect(() => {
    if (typeof firebaseApp !== 'undefined') {
      const onValueChange = (snapshot: firebase.database.DataSnapshot) => {
        const newState: PostState[] = [];
        snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
          const { key } = childSnapshot;
          /* eslint-disable */
          const imageUrl = childSnapshot.child('imageUrl').val();
          const createUser = childSnapshot.child('createUser').val();
          const favoritesCount = childSnapshot.child('favoriteUsers').numChildren();
          const createdAt = childSnapshot.child('createdAt').val();
          const updatedAt = childSnapshot.child('updatedAt').val();
          /* eslint-enable */
          if (
            typeof key === 'string' &&
            typeof imageUrl === 'string' &&
            typeof createUser === 'string' &&
            typeof favoritesCount === 'number' &&
            typeof createdAt === 'number' &&
            typeof updatedAt === 'number'
          ) {
            newState.push({
              id: key,
              imageUrl,
              createUser,
              favoritesCount,
              createdAt,
              updatedAt,
            });
          }
        });
        dispatch(AppSlice.actions.refreshPosts(newState));
      };
      firebaseApp
        .database()
        .ref('posts/')
        .once('value')
        .then(onValueChange)
        .catch(() => {
          return false;
        });
    }
  }, [firebaseApp, dispatch]);

  return (
    <>
      <Home posts={posts} />
    </>
  );
};

export default EnhancedHome;
