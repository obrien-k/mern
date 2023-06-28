import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateHomepage from './components/pages/PrivateHomepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import PrivateLayout from './components/layout/PrivateLayout';
import PublicLayout from './components/layout/PublicLayout';

import store from './store';
import PublicLanding from './components/layout/PublicLanding';
import { Provider } from 'react-redux';

const AuthenticatedApp = () => (
  <React.Fragment>
    <PrivateLayout pageTitle="Stellar">
      <section className="container">
        <Alert />
        <Routes>
          <Route path="/*" element={<PrivateHomepage />} />
          <Route path="/login" element={<PrivateHomepage />} />
          <Route path="/logout" element={<PublicLanding />} />
        </Routes>
      </section>
    </PrivateLayout>
  </React.Fragment>
);

const PublicApp = () => (
  <React.Fragment>
    <PublicLayout pageTitle="Stellar">
      <section className="container">
        <Alert />
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </PublicLayout>
  </React.Fragment>
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
