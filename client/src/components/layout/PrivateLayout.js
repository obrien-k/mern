import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../styles/layer_cake/style.css'; 
import PrivateHeader from './PrivateHeader';
import PrivateContent from './PrivateContent';

const PrivateLayout= ({ pageTitle, children }) => {
  return (
      <div>
      <PrivateHeader pageId={1} />
      <PrivateContent />
      {children}
    </div>
  );
};

export default PrivateLayout;
