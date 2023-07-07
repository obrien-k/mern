import React from "react";
import PrivateHeader from "./PrivateHeader";
import PrivateFooter from "./PrivateFooter";

const PrivateLayout = (props) => {
  const {
    pageTitle,
    userId,
    userName,
    options,
    userSessions,
    scriptStartTime,
    children,
  } = props;
  console.log("userId", userId);
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/styles/layer_cake/style.css"
      />
      <link rel="stylesheet" type="text/css" href="/static/styles/global.css" />
      <PrivateHeader userId={userId} userName={userName} pageId={1} />
      {children}
      <PrivateFooter
        userId={userId}
        options={options}
        userSessions={userSessions}
        scriptStartTime={scriptStartTime}
        siteLaunchYear="2009"
        siteName="Stellar"
      />
    </div>
  );
};

export default PrivateLayout;
