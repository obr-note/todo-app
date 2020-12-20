import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import EnhancedTodoList from './containers/pages/Home';
import EnhancedTodoItem from './containers/pages/TodoItem';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={EnhancedTodoList} />
    <Route path="/item/:itemId" component={EnhancedTodoItem} />
    <Redirect push to="/" />
  </Switch>
);

export default App;
