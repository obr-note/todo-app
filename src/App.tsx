import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import firebase from 'firebase';

import './App.css';
import EnhancedHome from './containers/pages/Home';
import EnhancedItemDetails from './containers/pages/ItemDetails';
import EnhancedNewItem from './containers/pages/NewItem';
import EnhancedEditItem from './containers/pages/EditItem';

const App: React.FC = () => {
  const { hash, pathname } = useLocation();
  const [firebaseApp, setFirebaseApp] = useState<firebase.app.App>();
  useEffect(() => {
    if (typeof firebaseApp === 'undefined') {
      const firebaseConfig = {
        apiKey: 'AIzaSyDXsakEgdsUTbseeeKmukpqHySP6dqTgYk',
        authDomain: 'obrnote-todo-app.firebaseapp.com',
        projectId: 'obrnote-todo-app',
        storageBucket: 'obrnote-todo-app.appspot.com',
        messagingSenderId: '609908246254',
        appId: '1:609908246254:web:637b284388e61e7b4715ff',
        measurementId: 'G-1Q1XG4L8V6',
      };
      setFirebaseApp(firebase.initializeApp(firebaseConfig));
    }
  }, [firebaseApp]);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <Container>
      <h1 className="App-title">TodoApp</h1>
      <Routes>
        <Route path="/" element={<EnhancedHome firebaseApp={firebaseApp} />} />
        <Route
          path="/items/new"
          element={<EnhancedNewItem firebaseApp={firebaseApp} />}
        />
        <Route
          path="/items/edit/:itemId"
          element={<EnhancedEditItem firebaseApp={firebaseApp} />}
        />
        <Route
          path="/items/show/:itemId"
          element={<EnhancedItemDetails firebaseApp={firebaseApp} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  );
};

export default App;
