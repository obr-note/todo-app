import React, { FC } from 'react';
import { Container, Button, Form, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home: FC<{
  content: { id: number; text: string }[];
  onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
  onResetFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ content, onChangeFunc, onSubmitFunc, onResetFunc }) => (
  <Container>
    <Form onSubmit={onSubmitFunc} onReset={onResetFunc}>
      <Form.Field>
        <Form.Input
          label="First Name"
          placeholder="First Name"
          id="firstName"
          onChange={onChangeFunc}
          required
        />
      </Form.Field>
      <Form.Field required>
        <Form.Input
          label="Last Name"
          placeholder="Last Name"
          id="lastName"
          onChange={onChangeFunc}
          required
        />
      </Form.Field>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
    <List>
      <List.Item>Apples</List.Item>
      <List.Item>Pears</List.Item>
      <List.Item>Oranges</List.Item>
      {content.map((item) => (
        <List.Item key={item.id}>{item.text}</List.Item>
      ))}
    </List>
    <List divided relaxed>
      {content.map((item) => (
        <Link to={`/item/${item.id}`}>
          <List.Item key={item.id}>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
              <List.Description as="a">Updated 10 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </Link>
      ))}
    </List>
  </Container>
);

export default Home;
