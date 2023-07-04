import React from 'react';
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
      <div id="alerts"><Alert alerts={alerts} /></div>
      <div id="alerts"><ModBar modBarItems={modBar} userId={userId} /></div>
    </div>
  );
};

export default PrivateHeader;