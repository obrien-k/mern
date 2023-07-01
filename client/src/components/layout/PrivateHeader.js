import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import Alert from './Alert';
import ModBar from '../admin/ModBar';

const PrivateHeader = ({ alerts, modBar, userId, userName, bonusPoints, bytesUploaded, bytesDownloaded, requiredRatio, flTokens }) => {
  return (
    <div id="wrapper">
      <UserMenu
        userId={userId}
        username={userName}
        bonusPoints={bonusPoints}
        bytesUploaded={bytesUploaded}
        bytesDownloaded={bytesDownloaded}
        requiredRatio={requiredRatio}
        flTokens={flTokens}
      />
      <Alert alerts={alerts} />
      <ModBar modBarItems={modBar} userId={userId} />
    </div>
  );
};

export default PrivateHeader;
