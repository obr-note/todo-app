import React, { FC } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import { PostState } from '../../reducer';

const Home: FC<{
  posts: PostState[];
}> = ({ posts }) => {
  // 1行に表示するカラム数
  const breakpointColumnsObj = {
    default: 4,
    1350: 3,
    1048: 2,
    576: 1,
  };

  return (
    <Container>
      <Link to="/items/new">新規作成</Link>

      <h1>勉強会一覧</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.map((post) => (
          <Image key={post.id} src={post.imageUrl} />
        ))}
      </Masonry>
    </Container>
  );
};

export default Home;
