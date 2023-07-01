import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import Alert from './Alert';
import ModBar from '../admin/ModBar';
import PrivateHomepage from '../pages/PrivateHomepage';
import InviteForm from '../profile/invite/InviteForm';
//import Toolbox from './Toolbox';

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
      <Routes>
      {/*removing this hasn't broken anything yet <Route path="/" element={<PrivateHomepage userId={userId} />} />*/}
        <Route
          path="/invite"
          element={<InviteForm userId={userId} userName={userName} />}
        />
      </Routes>
    </div>
  );
};

export default PrivateHeader;
