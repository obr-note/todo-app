import React, { FC } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';

// import { TodoItemState } from '../../reducer';

const Home: FC<{
  items: { id: number; title: string }[];
  // content: { [key: number]: TodoItemState };
}> = ({ items }) => {
  const events = [
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
    {
      title: 'React勉強会',
      text: 'Reactの勉強をします',
    },
    {
      title: 'JavaScript勉強会',
      text: 'JavaScriptの勉強をします',
    },
    {
      title: 'Ruby勉強会',
      text: 'Rubyの勉強をします',
    },
    {
      title: 'Rails勉強会',
      text: 'Railsの勉強をします',
    },
    {
      title: 'TypeScript勉強会',
      text: 'TypeScriptの勉強をします',
    },
  ];
  // 1行に表示するカラム数
  const breakpointColumnsObj = {
    default: 4,
    1350: 3,
    1048: 2,
    576: 1,
  };
  console.log('render home.tsx');

  return (
    <Container>
      <Link to="/items/new">新規作成</Link>

      <h1>勉強会一覧</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {events.map((e) => (
          <div className="event-card">
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </div>
        ))}
      </Masonry>
      <List divided relaxed>
        {items.map(({ id, title }) => (
          <List.Item key={id}>
            <Link to={`/items/show/${id}`}>{title}</Link>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Home;
