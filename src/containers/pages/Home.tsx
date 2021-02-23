import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

import Home from '../../components/pages/Home';
import { AppState, PostState } from '../../reducer';
import { addPosts } from '../../actions';

const EnhancedHome: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const [posts, setPosts] = React.useState<PostState[]>([]);
  const postsData = useSelector<AppState, PostState[]>((state) => state.posts);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setPosts(postsData);
  }, [postsData]);
  console.log(posts);
  // const addPostsFunc = React.useCallback(() => {
  //   if (typeof firebaseApp !== 'undefined') {
  //     const onValueChange = (snapshot: firebase.database.DataSnapshot) => {
  //       console.log('わあああ');
  //       console.log(snapshot);
  //       // const newState: { id: number; title: string }[] = [];
  //       // snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
  //       //   const { key } = childSnapshot;
  //       //   // eslint-disable-next-line
  //       //   const title = childSnapshot.child('title').val();
  //       //   if (typeof key === 'string' && typeof title === 'string') {
  //       //     newState.push({
  //       //       id: parseInt(key, 10),
  //       //       title,
  //       //     });
  //       //   }
  //       // });
  //     };
  //     firebaseApp
  //       .database()
  //       .ref('posts/')
  //       .once('value')
  //       .then(onValueChange)
  //       .catch(() => {
  //         return false;
  //       });
  //   }

  //   return () => {
  //     console.log('firebaseApp is undefined');
  //   };
  // }, [firebaseApp]);
  // export type PostState = {
  //   id: string;
  //   imageUrl: string;
  //   createUser: string;
  //   favoritesCount: number;
  //   createdAt: number;
  //   updatedAt: number;
  // };
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
        dispatch(addPosts(newState));
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
  // console.log(posts);
  // const addPostsFunc = React.useCallback(() => {
  //   if (typeof firebaseApp !== 'undefined') {
  //     console.log('rendering firebaseapp');
  //     const onValueChange = (snapshot: firebase.database.DataSnapshot) => {
  //       const newState: { id: number; title: string }[] = [];
  //       snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
  //         const { key } = childSnapshot;
  //         // eslint-disable-next-line
  //         const title = childSnapshot.child('title').val();
  //         if (typeof key === 'string' && typeof title === 'string') {
  //           newState.push({
  //             id: parseInt(key, 10),
  //             title,
  //           });
  //         }
  //       });
  //       setItems(newState);
  //     };
  //     firebaseApp.database().ref('items/').on('value', onValueChange);

  //     return () => {
  //       firebaseApp.database().ref('items/').off('value', onValueChange);
  //     };
  //   }

  //   return () => {
  //     console.log('firebaseApp is undefined');
  //   };
  // }, [firebaseApp]);

  return (
    <>
      <Home posts={posts} />
    </>
  );
};

export default EnhancedHome;
