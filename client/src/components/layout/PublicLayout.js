import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import Login from '../auth/Login';
import PublicLanding from './PublicLanding';
import '../../styles/layer_cake/style.css'; // Assuming you have this stylesheet file at the same directory level

const PublicLayout= ({ pageTitle, children }) => {
    return (
        <div>
        <Routes>
          <Route exact path="/" element={<PublicLanding/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    );
};

export default PublicLayout;
