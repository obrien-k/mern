import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "../../../layout/UserMenu";
import Alert from "../../../layout/Alert";
import ModBar from "../../../admin/ModBar";
import { SITE_NAME } from "../../../../config/config";

const PrivateHeader = (props) => {
  const {
    alerts,
    modBar,
    userId,
    userName,
    bonusPoints,
    bytesUploaded,
    bytesDownloaded,
    requiredRatio,
    flTokens,
    userRank,
  } = props;
  return (
    <>
      <div id="logo">
        <Link to="/private/">
          <img
            src="/static/styles/layer_cake/images/logo-new.png"
            alt="stellar"
            title="stellar"
          />
        </Link>
      </div>
      <div id="wrapper">
        <h1 className="hidden">{SITE_NAME}</h1>
        <div id="header">
          <UserMenu
            userId={userId}
            userName={userName}
            bonusPoints={bonusPoints}
            bytesUploaded={bytesUploaded}
            bytesDownloaded={bytesDownloaded}
            requiredRatio={requiredRatio}
            flTokens={flTokens}
          />
          <div id="alerts">
            <Alert alerts={alerts} />
          </div>
          <div id="alerts">
            <div>{userRank}</div>
            <ModBar modBarItems={modBar} userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateHeader;
