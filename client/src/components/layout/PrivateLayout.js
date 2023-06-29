import React from 'react';
import { Route, Routes } from 'react-router-dom';import '../../styles/layer_cake/style.css'; 
import UserMenu from './UserMenu';

const PrivateLayout= ({ pageTitle, children }) => {
  return (
      <div>
      <UserMenu pageId={1} />
      {children}
    </div>
  );
};

export default PrivateLayout;
