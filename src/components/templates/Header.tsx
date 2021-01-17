import _ from 'lodash';
import React from 'react';
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
  Visibility,
} from 'semantic-ui-react';

const HeaderTemplete: React.FC = () => {
  const [menuFixed, setMenuFixed] = React.useState(false);

  const stickTopMenu = React.useCallback(() => {
    setMenuFixed(true);
  }, []);
  const unStickTopMenu = React.useCallback(() => {
    setMenuFixed(false);
  }, []);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));

    return window.removeEventListener('resize', () =>
      setInnerWidth(window.innerWidth),
    );
  }, []);

  return (
    <>
      <Container text>
        <Header as="h1">Share your picture !!!</Header>
        <p>This is a photo sharing site for everyone!</p>
        <p>If you find a photo you like, click the &quot;good&quot; button!</p>
      </Container>
      <Visibility
        onBottomPassed={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
        id="menu-wrapper"
      >
        <Menu
          borderless
          fixed={menuFixed ? 'top' : undefined}
          className={menuFixed ? 'menu-style-fixed' : 'menu-style'}
        >
          <Container text>
            <Menu.Item>
              <Image size="mini" src="./images/logo.png" />
            </Menu.Item>
            <Menu.Item header>Picture Stocker</Menu.Item>
            {innerWidth > 767 ? (
              <>
                <Menu.Item as="a">Popular</Menu.Item>
                <Menu.Item as="a">Favorite</Menu.Item>
                <Menu.Item as="a">My Post</Menu.Item>
              </>
            ) : (
              ''
            )}

            <Menu.Menu position="right">
              <Dropdown text="Other" pointing className="link item">
                <Dropdown.Menu>
                  {innerWidth <= 767 ? (
                    <>
                      <Dropdown.Item>Popular</Dropdown.Item>
                      <Dropdown.Item>Favorite</Dropdown.Item>
                      <Dropdown.Item>My Post</Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  ) : (
                    ''
                  )}
                  <Dropdown.Header>User</Dropdown.Header>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    </>
  );
};

export default HeaderTemplete;
