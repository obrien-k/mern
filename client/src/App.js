import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateHomepage from './components/pages/PrivateHomepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import UserMenu from './components/layout/UserMenu';
import PublicLayout from './components/layout/PublicLayout';

import store from './store';
import PublicLanding from './components/layout/PublicLanding';

const AuthenticatedApp = () => (
  <Provider store={store}>
    <React.Fragment>
      <UserMenu user={'admin'} pageId={1} />
      <section className="container">
        <Alert />
        <Routes>
          <Route path="/" element={<PrivateHomepage />} />
          <Route path="/login" element={<PrivateHomepage />} />
          <Route path="/logout" element={<PublicLanding />} />
        </Routes>
      </section>
    </React.Fragment>
  </Provider>
);

const PublicApp = () => (
  <Provider store={store}>
    <React.Fragment>
      <PublicLayout pageTitle="Stellar">
        <section className="container">
          <Alert />
          <Routes>
            <Route path="/" element={<PublicLayout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </PublicLayout>
    </React.Fragment>
  </Provider>
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
