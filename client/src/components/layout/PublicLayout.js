import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecoveryPage from '../auth/Recovery';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PublicLanding from './PublicLanding';
import ReferralForm from '../auth/ReferralForm';

import '../../styles/public/style.css'; 

const PublicLayout= ({ pageTitle, children }) => {
    return (
        <div>
        <Routes>
          <Route exact path="/" element={<PublicLanding/>} />
          <Route path="/recovery" element={<RecoveryPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/referral" element={<ReferralForm/>} />
        </Routes>
      </div>
    );
};

export default PublicLayout;
