import React, { FC } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const Home: FC<{
  content: { id: number; text: string }[];
  onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
  onResetFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ content, onChangeFunc, onSubmitFunc, onResetFunc }) => (
  <>
    {content.map((item) => (
      <p key={item.id}>{item.text}</p>
    ))}
    <Form onSubmit={onSubmitFunc} onReset={onResetFunc}>
      <Form.Field>
        <label htmlFor="firstName">
          First Name
          <input
            placeholder="First Name"
            id="firstName"
            onChange={onChangeFunc}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">
          Last Name
          <input
            placeholder="Last Name"
            id="lastName"
            onChange={onChangeFunc}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  </>
);

export default Home;
