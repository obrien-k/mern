import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecoveryPage from '../auth/Recovery';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PublicLanding from './PublicLanding';
import '../../styles/layer_cake/style.css'; 

const PublicLayout= ({ pageTitle, children }) => {
    return (
        <div>
        <Routes>
          <Route exact path="/" element={<PublicLanding/>} />
          <Route path="/recovery" element={<RecoveryPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    );
};

export default PublicLayout;
