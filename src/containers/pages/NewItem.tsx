import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Image, Progress, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { uuid } from 'uuidv4';

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
    accept: 'image/*',
    minSize: 0,
    maxSize: 1048576,
  });

  const onUpload = async () => {
    // ローディングをOn。progressを初期化
    setUploading(true);
    setProgress(0);

    const uploadImageAsPromise = (file: File) => {
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

            if (typeof firebaseApp !== 'undefined') {
              const id = uuid();
              firebaseApp
                .database()
                .ref('posts/')
                .child(id)
                .set({
                  id,
                  imageUrl: downloadURL,
                  createUser: uuid(),
                  isDeleted: 0,
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                })
                .then(() => {
                  alert('でけた');
                })
                .catch(() => {
                  alert('Synchronization failed');
                });
            }

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
    await Promise.all(
      files.map((file) => {
        return uploadImageAsPromise(file);
      }),
    );

    // ローディングを終了し、リストを空に
    setUploading(false);
    setProgress(0);
    setFiles([]);

    alert('送信されました');
  };

  // アップロード中はCircularを表示する
  if (uploading === true) {
    const percent = Math.round((progress / files.length) * 100);

    return <Progress percent={percent} progress />;
  }

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
  );
};

export default EnhancedNewItem;
