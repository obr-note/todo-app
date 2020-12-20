import React, { FC } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const Home: FC<{
  content: { id: number; text: string }[];
  addFunction: () => void;
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitFunction: () => void;
}> = ({ content, addFunction, onChangeFunction, onSubmitFunction }) => (
  <>
    {content.map((item) => (
      <p key={item.id}>{item.text}</p>
    ))}
    <Button color="green" onClick={addFunction}>
      押してね
    </Button>
    <Form onSubmit={onSubmitFunction}>
      <Form.Field>
        <label htmlFor="firstName">
          First Name
          <input
            placeholder="First Name"
            id="firstName"
            onChange={onChangeFunction}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">
          Last Name
          <input
            placeholder="Last Name"
            id="lastName"
            onChange={onChangeFunction}
          />
        </label>
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </>
);

export default Home;
