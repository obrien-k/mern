import React from 'react';

import '../../styles/public/style.css'; 

const PublicLayout = ({ pageTitle, children }) => {
  return (
    <div>
      {children}
    </div>
  );
};


export default PublicLayout;
