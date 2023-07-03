import React from 'react';
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