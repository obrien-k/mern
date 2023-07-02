import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './utils/api';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import PrivateRoute from './components/routing/PrivateRoute';
import PrivateLayout from './components/layout/PrivateLayout';
import PrivateContent from './components/layout/PrivateContent';
import PrivateHomepage from './components/pages/PrivateHomepage';

import PublicLayout from './components/layout/PublicLayout';
import PublicLanding from './components/layout/PublicLanding';
import RecoveryPage from './components/auth/Recovery';
import ReferralForm from './components/auth/ReferralForm';
import store from './store';
import Toolbox from './components/admin/Toolbox';

const App = ({userId, userName}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <section className="container">
          <Alert />
          <Routes>
            {/* Public Routes */}
            <Route path="/recovery" element={<PublicLayout pageTitle="Stellar"><RecoveryPage /></PublicLayout>} />
            <Route path="/referral" element={<PublicLayout pageTitle="Stellar"><ReferralForm /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout pageTitle="Stellar"><Register /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout pageTitle="Stellar"><Login /></PublicLayout>} />
  
            {/* Private Routes */}
            <Route path="/private/*" element={
              <PrivateRoute>
                <PrivateLayout pageTitle="Stellar" userId={userId} userName={userName}>
                    <PrivateContent userId={userId}/>  
                </PrivateLayout>
              </PrivateRoute>
            } />

            {/* Catch all route */}
            <Route path="/*" element={<PublicLayout pageTitle="Stellar"><PublicLanding /></PublicLayout>} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
  
};

export default App;
