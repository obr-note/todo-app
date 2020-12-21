import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EnhancedItem: FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  return (
    <>
      <p>ここにいるよ</p>
      <p>{itemId}</p>
      <button type="button" onClick={() => navigate(-1)}>
        戻る
      </button>
      <button type="button" onClick={() => navigate(1)}>
        進む
      </button>
      <button type="button" onClick={() => navigate('/')}>
        トップページへ
      </button>
    </>
  );
};

export default EnhancedItem;
