import React from 'react';

const PublicLayout = ({ pageTitle, children }) => {
  return (
    <div>
      <link rel="stylesheet" type="text/css" href="/static/styles/kuro/style.css" />
      <link rel="stylesheet" type="text/css" href="/static/styles/global.css" />
      {children}
    </div>
  );
};


export default PublicLayout;
