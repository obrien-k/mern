import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../styles/layer_cake/style.css'; 
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';

const PrivateLayout = ({ pageTitle, userId, userName, children }) => {
  return (
    <div>
      <PrivateHeader userId={userId} userName={userName} pageId={1} />
      {children}
      {/* TODO <PrivateFooter/> */}
    </div>
  );
};

export default PrivateLayout;