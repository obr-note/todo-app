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
    <Link to="/item/1">お問い合わせ</Link>
  </Container>
);

export default Home;
