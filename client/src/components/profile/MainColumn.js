import React from "react";
import Spinner from "../layout/Spinner";

const MainColumn = ({ profile }) => {
  if (!profile) return <Spinner />;

  // todo profileInfo, staffTools
  const { username, avatar } = profile;

  return (
    <div className="main_column">
      <div className="box">
        <div className="head">{username}</div>
        <img src={avatar} alt="User Avatar" />
        <div className="pad profileinfo" id="profilediv">
          profileInfo
        </div>
        <div id="staff_tools">staffTools</div>
      </div>
    </div>
  );
};

export default MainColumn;
