import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import UserMenu from './components/layout/UserMenu';
import PublicLayout from './components/layout/PublicLayout';

import store from './store';

const AuthenticatedApp = () => (
  <React.Fragment>
    <Navbar />
    <UserMenu user={'admin'} pageId={1} />
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </section>
  </React.Fragment>
);

const PublicApp = () => (
  <PublicLayout pageTitle="Welcome to My Site">
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  </PublicLayout>
);

const AuthenticationCheck = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <AuthenticatedApp /> : <PublicApp />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthenticationCheck />
      </Router>
    </Provider>
  );
};

export default App;
