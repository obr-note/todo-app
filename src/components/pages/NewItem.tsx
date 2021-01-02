import React, { FC } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';

const NewItem: FC<{
  inputTitle: React.RefObject<HTMLInputElement>;
  inputBody: React.RefObject<HTMLInputElement>;
  onSubmitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ inputTitle, inputBody, onSubmitFunc }) => (
  <Container>
    <Form onSubmit={onSubmitFunc}>
      <Form.Field>
        <label>Title</label>
        <input
          type="text"
          id="title"
          placeholder="title"
          ref={inputTitle}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Body</label>
        <input id="body" placeholder="body" ref={inputBody} required />
      </Form.Field>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
);

export default NewItem;
