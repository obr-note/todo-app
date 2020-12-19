import React, { FC, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import TodoList from '../../components/templates/TodoList';

const EnhancedTodoList: FC = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState<{ id: number; text: string }[]>([]);
  const add = (): void => {
    setState([...state, { id: count, text: 'おはよう' }]);
    setCount((c) => c + 1);
  };

  return (
    <>
      {state.map((item) => (
        <TodoList key={item.id} text={item.text} />
      ))}
      <Button color="green" onClick={add}>
        押してね
      </Button>
      <Form>
        <Form.Field>
          <label htmlFor="firstName">
            First Name
            <input placeholder="First Name" id="firstName" />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="lastName">
            Last Name
            <input placeholder="Last Name" id="lastName" />
          </label>
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default EnhancedTodoList;
