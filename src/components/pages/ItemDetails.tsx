import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header, List, Button } from 'semantic-ui-react';

import { TodoItemState } from '../../reducer';

const EnhancedItemDetails: FC<{ item: TodoItemState }> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header as="h2">{item.title}</Header>
      <List divided relaxed>
        <List.Item>{item.id}</List.Item>
        <List.Item>{item.body}</List.Item>
        <List.Item>{new Date(item.createdAt).toString()}</List.Item>
        <List.Item>{new Date(item.updatedAt).toString()}</List.Item>
      </List>
      <Button onClick={() => navigate(-1)}>戻る</Button>
      <Button onClick={() => navigate(1)}>進む</Button>
      <Button onClick={() => navigate('/')}>トップページへ</Button>
    </Container>
  );
};

export default EnhancedItemDetails;
