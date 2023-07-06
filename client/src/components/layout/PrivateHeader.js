import React from 'react';
import UserMenu from './UserMenu';
import Alert from './Alert';
import ModBar from '../admin/ModBar';
import {SITE_NAME} from '../../config/config';

const PrivateHeader = ({ alerts, modBar, userId, userName, bonusPoints, bytesUploaded, bytesDownloaded, requiredRatio, flTokens }) => {
  return (
    <div id="wrapper">
      <h1 className="hidden">{SITE_NAME}</h1>
      <div id="header">
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
    </div>
  );
};

export default PrivateHeader;