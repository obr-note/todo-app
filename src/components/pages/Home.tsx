import React, { FC } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { TodoItemState } from '../../reducer';

const Home: FC<{
  content: { [key: number]: TodoItemState };
}> = ({ content }) => (
  <Container>
    <Link to="/items/new">新規作成</Link>
    <List divided relaxed>
      {Object.keys(content).map((id) => (
        <List.Item key={id}>
          <Link to={`/items/show/${id}`}>{content[Number(id)].title}</Link>
        </List.Item>
      ))}
    </List>
  </Container>
);

export default Home;
