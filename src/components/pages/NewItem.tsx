import React, { FC } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';

const NewItem: FC<{
  onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
  onResetFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ onChangeFunc, onSubmitFunc, onResetFunc }) => (
  <Container>
    <Form onSubmit={onSubmitFunc} onReset={onResetFunc}>
      <Form.Field>
        <Form.Input
          label="title"
          placeholder="title"
          id="title"
          onChange={onChangeFunc}
          required
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label="body"
          placeholder="body"
          id="body"
          onChange={onChangeFunc}
          required
        />
      </Form.Field>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
);

export default NewItem;
