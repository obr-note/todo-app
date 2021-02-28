import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Image, Progress, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

// Dropzoneの設定
const acceptFile = 'image/*';
const maxFileSize = 1048576;

// previewを追加
type MyFile = File & {
  preview: string;
};

const EnhancedNewItem: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
  firebaseApp,
}) => {
  // State
  const [files, setFiles] = React.useState<MyFile[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  /*
  ドロップした時の処理
  */
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    console.log('onDrop');

    // previewの追加
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFile,
    minSize: 0,
    maxSize: maxFileSize,
  });

  const onUpload = async () => {
    console.log('onUpload start');

    // ローディングをOn。progressを初期化
    setUploading(true);
    setProgress(0);

    const uploadImageAsPromise = (file: File) => {
      console.log('uploadImageAsPromise start');

      // アップロード先のファイルパスの作成
      const fileName = file.name;
      if (typeof firebaseApp !== 'undefined') {
        const storageRef = firebaseApp
          .storage()
          .ref()
          .child(`images/${fileName}`);

        return new Promise((resolve, reject) => {
          // Upload file
          const task = storageRef.put(file);

          // Update progress bar
          task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              const percent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`${percent}% done`);
            },
            (err) => {
              // 失敗時
              console.log('upload error');
              reject(err);
            },
            () => {
              // 成功時
              console.log('upload complete.');
              task
                .then((snapshot: firebase.storage.UploadTaskSnapshot) => {
                  resolve(snapshot.ref.getDownloadURL());
                })
                .catch(() => console.log('error'));
            },
          );
        })
          .then((downloadURL) => {
            console.log(`Finished uploading file: ${fileName}`);

            // progressを更新する
            setProgress((oldProgress) => oldProgress + 1);

            return downloadURL;
          })
          .catch(() => {
            console.log('Error:uploadImageAsPromise');
          });
      }

      return undefined;
    };

    // 複数のファイルアップロードをPromise.allで並列に実行する
    const result = await Promise.all(
      files.map((file) => {
        return uploadImageAsPromise(file);
      }),
    );

    console.log('Upload result');
    console.log(result);

    // ローディングを終了し、リストを空に
    setUploading(false);
    setProgress(0);
    setFiles([]);

    alert('送信されました');
  };

  // アップロード中はCircularを表示する
  if (uploading === true) {
    const percent = Math.round((progress / files.length) * 100);
    console.log(`Loadingの表示。Progreass:${progress} Percent:${percent}`);

    return (
      <Progress percent={percent} progress />
      // <Grid container className={classes.root} spacing={3} justify="center">
      //   <Grid item xs={6}>
      //     <Paper variant="outlined" elevation={3} className={classes.paper}>
      //       <CircularProgress
      //         className={classes.circular}
      //         variant="determinate"
      //         value={percent}
      //       />
      //     </Paper>
      //   </Grid>
      // </Grid>
    );
  }
  // // タイルを敷き詰められるように、一部画像のサイズは大きくする
  // const tile_cols = 3;
  // let tile_featured = [];
  // switch (files.length % tile_cols) {
  //   case 0:
  //     tile_featured = [];
  //     break;
  //   case 1:
  //     tile_featured = [0, files.length - 1];
  //     break;
  //   case 2:
  //     tile_featured = [0];
  //     break;
  // }

  // // サムネイルの作成
  // const thumbs = files.map((file, index) => (
  //   <GridListTile
  //     key={file.preview}
  //     cols={tile_featured.indexOf(index) >= 0 ? 2 : 1}
  //     rows={1}
  //   >
  //     <img src={file.preview} alt={file.name} />
  //     <GridListTileBar
  //       title={file.name}
  //       subtitle={file.size}
  //       actionIcon={
  //         <IconButton aria-label={`star ${file.name}`} className={classes.icon}>
  //           <InfoIcon />
  //         </IconButton>
  //       }
  //       actionPosition="left"
  //       className={classes.titleBar}
  //     />
  //   </GridListTile>
  // ));

  const diabledButton = files.length === 0;

  return (
    <>
      {/* eslint-disable-next-line */}
      <div {...getRootProps()} className="dropzone">
        {/* eslint-disable-next-line */}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      <Button
        onClick={onUpload}
        variant="outlined"
        color="blue"
        disabled={diabledButton}
      >
        Upload
      </Button>
      {files.map((file) => (
        <Image
          key={file.name}
          src={file.preview}
          alt={file.name}
          size="small"
        />
      ))}
    </>
    // <Grid container className={classes.root} spacing={3} justify="center">
    //   <Grid item xs={6}>
    //     <Paper variant="outlined" elevation={3} className={classes.paper}>
    //       <Typography variant="h4">Upload image files to GCS</Typography>
    //       <div>
    //         <Paper className={classes.dropzone} {...getRootProps()}>
    //           <input {...getInputProps()} />
    //           {isDragActive ? (
    //             <p>Drop the files here ...</p>
    //           ) : (
    //             <p>Drag 'n' drop some files here, or click to select files</p>
    //           )}
    //         </Paper>
    //         <Button
    //           onClick={onUpload}
    //           variant="outlined"
    //           color="primary"
    //           disabled={diabledButton}
    //           className={classes.upButton}
    //           startIcon={<CloudUploadIcon />}
    //         >
    //           Upload
    //         </Button>
    //         <aside className={classes.thumbsContainer}>
    //           <GridList
    //             cellHeight={200}
    //             className={classes.gridList}
    //             cols={tile_cols}
    //           >
    //             {thumbs}
    //           </GridList>
    //         </aside>
    //       </div>
    //     </Paper>
    //   </Grid>
    // </Grid>
  );

  // const [imgFile, setImgFile] = React.useState('');
  // const imgDownload = React.useCallback(() => {
  //   if (typeof firebaseApp !== 'undefined') {
  //     const storageRef = firebaseApp.storage().ref();
  //     const imgSample = storageRef.child('logo.png');
  //     imgSample
  //       .getDownloadURL()
  //       .then((url) => {
  //         setImgFile(url);
  //         console.log(url);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [firebaseApp]);

  // const btnUploadChange = React.useCallback(
  //   (ev: React.ChangeEvent<HTMLInputElement>) => {
  //     if (
  //       typeof firebaseApp !== 'undefined' &&
  //       ev.currentTarget.files !== null
  //     ) {
  //       const storageRef = firebaseApp.storage().ref();
  //       const uploadRef = storageRef.child('upload.png');
  //       const f = ev.currentTarget.files[0];
  //       uploadRef
  //         .put(f)
  //         .then(() => {
  //           uploadRef
  //             .getDownloadURL()
  //             .then((url) => {
  //               setImgFile(url);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   },
  //   [firebaseApp],
  // );

  // return (
  //   <>
  //     <h1>テストページ</h1>
  //     <Image src={imgFile} size="small" />
  //     <div id="imgSample" />
  //     <Button onClick={imgDownload}>Click Here</Button>
  //     <input type="file" id="btnUpload" onChange={btnUploadChange} />
  //   </>
  // );
};

export default EnhancedNewItem;

// import React, { FC, useRef } from 'react';
// // import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebase/storage';

// // import React, { FC } from 'react';
// // import firebase from 'firebase/app';
// // import 'firebase/storage';
// // import { Image, Progress, Button } from 'semantic-ui-react';
// // import { useDropzone } from 'react-dropzone';
// // import { addItem } from '../../actions';
// import NewItem from '../../components/pages/NewItem';

// const EnhancedNewItem: FC<{ firebaseApp: firebase.app.App | undefined }> = ({
//   firebaseApp,
// }) => {
//   const inputTitle = useRef<HTMLInputElement>(null);
//   const inputBody = useRef<HTMLInputElement>(null);
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (typeof firebaseApp !== 'undefined') {
//       const ref = firebaseApp.database().ref('items/');
//       ref
//         .orderByKey()
//         .limitToLast(1)
//         .once('value')
//         .then((snapshot) => {
//           let newId = 1;
//           snapshot.forEach((childSnapshot) => {
//             const childSnapshotKey = childSnapshot.key;
//             newId =
//               childSnapshotKey && parseInt(childSnapshotKey, 10) + 1 > newId
//                 ? parseInt(childSnapshotKey, 10) + 1
//                 : newId;
//           });
//           if (inputTitle.current && inputBody.current) {
//             ref
//               .child(newId.toString())
//               .set({
//                 id: newId,
//                 title: inputTitle.current.value,
//                 body: inputBody.current.value,
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//               })
//               .then(() => {
//                 navigate('/');
//               })
//               .catch(() => {
//                 alert('Synchronization failed');
//               });
//           }
//         })
//         .catch(() => {
//           alert('Synchronization failed');
//         });
//     }
//   };
//   // const onSubmitFunc = (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   if (inputTitle.current && inputBody.current) {
//   //     dispatch(addItem(inputTitle.current.value, inputBody.current.value));
//   //     navigate('/');
//   //   }
//   // };

//   return (
//     <>
//       <NewItem
//         inputTitle={inputTitle}
//         inputBody={inputBody}
//         onSubmitFunc={onSubmitFunc}
//       />
//     </>
//   );
// };

// export default EnhancedNewItem;
