import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header, List, Button } from 'semantic-ui-react';

const EnhancedItemDetails: FC<{
  itemId: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
  deleteFunc: () => void;
}> = ({ itemId, title, body, createdAt, updatedAt, deleteFunc }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header as="h2">{title}</Header>
      <List divided relaxed>
        <List.Item>{itemId}</List.Item>
        <List.Item>{body}</List.Item>
        <List.Item>{new Date(createdAt).toString()}</List.Item>
        <List.Item>{new Date(updatedAt).toString()}</List.Item>
      </List>
      <Button onClick={() => navigate(-1)}>戻る</Button>
      <Button onClick={() => navigate(1)}>進む</Button>
      <Button onClick={deleteFunc}>削除</Button>
      <Button onClick={() => navigate(`/items/edit/${itemId}`)}>編集</Button>
      <Button onClick={() => navigate('/')}>トップページへ</Button>
    </Container>
  );
};

export default EnhancedItemDetails;
