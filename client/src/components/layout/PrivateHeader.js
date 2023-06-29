import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import Alert from './Alert';
import ModBar from '../admin/ModBar';
import PrivateHomepage from '../pages/PrivateHomepage';
import InviteForm from '../profile/invite/InviteForm';


const PrivateHeader = ({alerts, modBar, userID, userName, bonusPoints, bytesUploaded, bytesDownloaded, requiredRatio, flTokens}) => {

  return (
    <div id="wrapper">
      <UserMenu
        username={userName}
        bonusPoints={bonusPoints}
        bytesUploaded={bytesUploaded}
        bytesDownloaded={bytesDownloaded}
        requiredRatio={requiredRatio}
        flTokens={flTokens}
      />
      <Alert alerts={alerts} />
      <ModBar modBarItems={modBar} />
      <Routes>
        <Route path="/" element={<PrivateHomepage />} />
        <Route path="/invite" element={<InviteForm userID={userID} username={userName} />} />
      </Routes>
    </div>
  );
};

export default PrivateHeader;