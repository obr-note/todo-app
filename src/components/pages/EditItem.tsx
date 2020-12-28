import React, { FC } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';

const EditItem: FC<{
  title: string;
  body: string;
  inputTitle: React.RefObject<HTMLInputElement>;
  inputBody: React.RefObject<HTMLInputElement>;
  onSubmitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ title, body, inputTitle, inputBody, onSubmitFunc }) => (
  <Container>
    <Form onSubmit={onSubmitFunc}>
      <Form.Field>
        <label>Title</label>
        <input
          type="text"
          id="title"
          placeholder="title"
          defaultValue={title}
          ref={inputTitle}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Body</label>
        <input
          id="body"
          placeholder="body"
          defaultValue={body}
          ref={inputBody}
          required
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
);

export default EditItem;
