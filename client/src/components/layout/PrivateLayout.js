import React from 'react';
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';

const PrivateLayout = ({ pageTitle, userId, userName, options, userSessions, scriptStartTime, children }) => {
  return (
    <div>
      <PrivateHeader userId={userId} userName={userName} pageId={1} />
      {children}
      <PrivateFooter userId={userId} options={options} userSessions={userSessions} scriptStartTime={scriptStartTime} siteLaunchYear='2009' siteName='Stellar' />
    </div>
  );
};

export default PrivateLayout;