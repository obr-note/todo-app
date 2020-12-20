import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EnhancedItem: FC = () => {
  const history = useHistory();
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <>
      <p>ここにいるよ</p>
      <p>{itemId}</p>
      <button type="button" onClick={() => history.goBack()}>
        戻る
      </button>
      <button type="button" onClick={() => history.goForward()}>
        進む
      </button>
      <button type="button" onClick={() => history.push('/')}>
        トップページへ
      </button>
    </>
  );
};

export default EnhancedItem;
