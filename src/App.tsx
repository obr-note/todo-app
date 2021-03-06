import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import firebase from 'firebase/app';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './App.css';
import EnhancedHome from './containers/pages/Home';
import EnhancedItemDetails from './containers/pages/ItemDetails';
import EnhancedNewItem from './containers/pages/NewItem';
import EnhancedEditItem from './containers/pages/EditItem';
import HeaderTemplete from './components/templates/Header';
import FooterTemplete from './components/templates/Footer';
import TestPage from './components/pages/TestPage';

const App: React.FC = () => {
  const { hash, pathname } = useLocation();
  const [firebaseApp, setFirebaseApp] = useState<firebase.app.App>();
  useEffect(() => {
    if (typeof firebaseApp === 'undefined') {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
      };
      setFirebaseApp(firebase.initializeApp(firebaseConfig));
    }
  }, [firebaseApp]);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <>
      <HeaderTemplete />
      <Routes>
        <Route path="/" element={<EnhancedHome firebaseApp={firebaseApp} />} />
        <Route path="/test" element={<TestPage firebaseApp={firebaseApp} />} />
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
      <FooterTemplete />
      <Link
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
        to="/items/new"
      >
        <Icon
          circular
          inverted
          link
          color="teal"
          name="paper plane"
          size="big"
        />
      </Link>
    </>
  );
};

export default App;
