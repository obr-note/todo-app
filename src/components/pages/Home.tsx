import React, { FC } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import { TodoItemState } from '../../reducer';

const Home: FC<{
  items: { id: number; title: string }[];
  // content: { [key: number]: TodoItemState };
}> = ({ items }) => (
  <Container>
    <Link to="/items/new">新規作成</Link>
    <List divided relaxed>
      {items.map(({ id, title }) => (
        <List.Item key={id}>
          <Link to={`/items/show/${id}`}>{title}</Link>
        </List.Item>
      ))}
    </List>
  </Container>
);

export default Home;
