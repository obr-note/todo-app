import React, { FC } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// import { TodoItemState } from '../../reducer';

const Home: FC<{
  content: { id: number; title: string }[];
  // content: { [key: number]: TodoItemState };
}> = ({ content }) => (
  <Container>
    <Link to="/items/new">新規作成</Link>
    <List divided relaxed>
      {content.map(({ id, title }) => (
        <List.Item key={id}>
          <Link to={`/items/show/${id}`}>{title}</Link>
        </List.Item>
      ))}
    </List>
  </Container>
);

export default Home;
