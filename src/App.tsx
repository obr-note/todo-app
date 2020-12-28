import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';

import './App.css';
import EnhancedHome from './containers/pages/Home';
import EnhancedItemDetails from './containers/pages/ItemDetails';
import EnhancedNewItem from './containers/pages/NewItem';
import EnhancedEditItem from './containers/pages/EditItem';

const App: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <Container>
      <h1 className="App-title">TodoApp</h1>
      <Routes>
        <Route path="/" element={<EnhancedHome />} />
        <Route path="/items/new" element={<EnhancedNewItem />} />
        <Route path="/items/edit/:itemId" element={<EnhancedEditItem />} />
        <Route path="/items/show/:itemId" element={<EnhancedItemDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
};

export default App;
