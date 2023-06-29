import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../styles/layer_cake/style.css'; 
import PrivateHeader from './PrivateHeader';

const PrivateLayout= ({ pageTitle, children }) => {
  return (
      <div>
      <PrivateHeader pageId={1} />
      {children}
    </div>
  );
};

export default PrivateLayout;
