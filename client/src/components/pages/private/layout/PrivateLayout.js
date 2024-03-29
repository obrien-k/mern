import React from "react";
import { useSelector } from "react-redux";
import PrivateHeader from "./PrivateHeader";
import PrivateFooter from "./PrivateFooter";

const PrivateLayout = (props) => {
  const user = useSelector((state) => state.auth.user);

  const userId = user?._id;
  const userName = user?.username;
  const { pageTitle, options, userSessions, scriptStartTime, children } = props;
  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/styles/layer_cake/style.css"
      />
      <link rel="stylesheet" type="text/css" href="/static/styles/global.css" />
      <PrivateHeader userId={userId} userName={userName} pageId={1} />
      {React.cloneElement(props.children, { userId, userName })}
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
