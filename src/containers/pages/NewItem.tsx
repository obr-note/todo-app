import React, { FC, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

// import React, { FC } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/storage';
// import { Image, Progress, Button } from 'semantic-ui-react';
// import { useDropzone } from 'react-dropzone';
// import { addItem } from '../../actions';
import NewItem from '../../components/pages/NewItem';

const EnhancedNewItem: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof firebaseApp !== 'undefined') {
      const ref = firebaseApp.database().ref('items/');
      ref
        .orderByKey()
        .limitToLast(1)
        .once('value')
        .then((snapshot) => {
          let newId = 1;
          snapshot.forEach((childSnapshot) => {
            const childSnapshotKey = childSnapshot.key;
            newId =
              childSnapshotKey && parseInt(childSnapshotKey, 10) + 1 > newId
                ? parseInt(childSnapshotKey, 10) + 1
                : newId;
          });
          if (inputTitle.current && inputBody.current) {
            ref
              .child(newId.toString())
              .set({
                id: newId,
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
        })
        .catch(() => {
          alert('Synchronization failed');
        });
    }
  };
  // const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (inputTitle.current && inputBody.current) {
  //     dispatch(addItem(inputTitle.current.value, inputBody.current.value));
  //     navigate('/');
  //   }
  // };

  return (
    <>
      <NewItem
        inputTitle={inputTitle}
        inputBody={inputBody}
        onSubmitFunc={onSubmitFunc}
      />
    </>
  );
};

export default EnhancedNewItem;
