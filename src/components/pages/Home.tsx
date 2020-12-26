import React, { FC } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { TodoItemState } from '../../reducer';

const Home: FC<{
  content: TodoItemState[];
}> = ({ content }) => (
  <Container>
    <Link to="/items/new">新規作成</Link>
    <List divided relaxed>
      {content.map((item) => (
        <List.Item key={item.id}>
          <Link to={`/item/${item.id}`}>{item.title}</Link>
        </List.Item>
      ))}
    </List>
  </Container>
);

export default Home;
