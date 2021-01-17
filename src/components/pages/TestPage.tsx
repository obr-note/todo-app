import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Image, Button } from 'semantic-ui-react';

const TestPage: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  const [imgFile, setImgFile] = React.useState('');
  const imgDownload = React.useCallback(() => {
    if (typeof firebaseApp !== 'undefined') {
      const storageRef = firebaseApp.storage().ref();
      const imgSample = storageRef.child('logo.png');
      imgSample
        .getDownloadURL()
        .then((url) => {
          setImgFile(url);
          console.log(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebaseApp]);

  const btnUploadChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (
        typeof firebaseApp !== 'undefined' &&
        ev.currentTarget.files !== null
      ) {
        const storageRef = firebaseApp.storage().ref();
        const uploadRef = storageRef.child('upload.png');
        const f = ev.currentTarget.files[0];
        uploadRef
          .put(f)
          .then(() => {
            uploadRef
              .getDownloadURL()
              .then((url) => {
                setImgFile(url);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [firebaseApp],
  );

  return (
    <>
      <h1>テストページ</h1>
      <Image src={imgFile} size="small" />
      <div id="imgSample" />
      <Button onClick={imgDownload}>Click Here</Button>
      <input type="file" id="btnUpload" onChange={btnUploadChange} />
    </>
  );
};

export default TestPage;
