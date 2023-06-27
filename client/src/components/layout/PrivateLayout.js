import React from 'react';
import { Route, Routes } from 'react-router-dom';import '../../styles/layer_cake/style.css'; 
import UserMenu from './UserMenu';

const PublicLayout= ({ pageTitle, children }) => {
  return (
      <div>
      <UserMenu user={'admin'} pageId={1} />
    </div>
  );
};

export default PublicLayout;
