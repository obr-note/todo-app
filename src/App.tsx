import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import EnhancedTodoList from './containers/pages/Home';
import EnhancedTodoItem from './containers/pages/TodoItem';

const App: React.FC = () => {
  const { hash, pathname } = useLocation();
  const { action } = useHistory();

  useEffect(() => {
    if (!hash || action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, hash, pathname]);

  return (
    <Switch>
      <Route exact path="/" component={EnhancedTodoList} />
      <Route path="/item/:itemId" component={EnhancedTodoItem} />
      <Redirect push to="/" />
    </Switch>
  );
};

export default App;
