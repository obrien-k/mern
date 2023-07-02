import React, { useEffect } from 'react';
import { useSelector, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './utils/api';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import PrivateLayout from './components/layout/PrivateLayout';
import PrivateHomepage from './components/pages/PrivateHomepage';

import PublicLayout from './components/layout/PublicLayout';
import PublicLanding from './components/layout/PublicLanding';

import store from './store';

const AuthenticatedApp = ({userId, userName}) => (
  <React.Fragment>
    <PrivateLayout pageTitle="Stellar" userId={userId} userName={userName}>
    </PrivateLayout>
  </React.Fragment>
);

const PublicApp = () => (
  <React.Fragment>
    <PublicLayout pageTitle="Stellar">
      <section className="container">
        <Alert />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PublicLanding />} />
        </Routes>
      </section>
    </PublicLayout>
  </React.Fragment>
);

const AuthenticationCheck = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?._id);
  const userName = useSelector((state) => state.auth.user?.username);
  const forumId = useSelector((state) => state.auth.forum?._id);
  const topicId = useSelector((state) => state.auth.topic?._id);
  const postId = useSelector((state) => state.auth.post?._id);

  if (isAuthenticated) {
    return <AuthenticatedApp userId={userId} userName={userName} />;
  } else {
    return <PublicApp />;
  }
};

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <AuthenticationCheck />
      </Router>
    </Provider>
  );
};


export default App;
