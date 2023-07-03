import React from 'react';
import '../../static/styles/global.css';
import '../../static/styles/layer_cake/style.css'; // todo: why does this apply to private layout, why do other themes look so broken

const PublicLayout = ({ pageTitle, children }) => {
  return (
    <div>
      {children}
    </div>
  );
};


export default PublicLayout;
