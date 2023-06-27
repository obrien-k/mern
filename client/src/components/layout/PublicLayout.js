import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../auth/AuthPage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PublicLanding from './PublicLanding';
import '../../styles/kuro/style.css'; 

const PublicLayout= ({ pageTitle, children }) => {
    return (
        <div>
        <Routes>
          <Route exact path="/" element={<PublicLanding/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    );
};

export default PublicLayout;
