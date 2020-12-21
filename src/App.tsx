import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import EnhancedTodoList from './containers/pages/Home';
import EnhancedTodoItem from './containers/pages/TodoItem';

const App: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="/" element={<EnhancedTodoList />} />
      <Route path="/item/:itemId" element={<EnhancedTodoItem />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
