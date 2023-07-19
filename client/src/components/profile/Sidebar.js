import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";

const Sidebar = ({ profile }) => {
  if (!profile) return <Spinner />;

  // todo const { statistics, percentileRankings, personal, community, donorStatistics } = profile;
  const { statistics, percentileRankings, community, donorStatistics } = 1;
  const { personal, siteAppearance } = profile;
  const avatar = personal.avatar;
  console.log(avatar);

  console.log(profile + "Sidebar");
  return (
    <div className="sidebar">
      <AvatarBox src={avatar} />
    </div>
  );
};

// Box for avatar image
const AvatarBox = ({ src }) => (
  <div className="box box_image box_image_avatar">
    <div className="head colhead_dark">Avatar</div>
    <div align="center">
      <div className="avatar_container">
        <div>
          <img width="150" alt="user's avatar" className="avatar_0" src={src} />
        </div>
      </div>
    </div>
  </div>
);

// Box for statistics
const Box = ({ title, data }) => (
  <div className="box box_info box_userinfo_stats">
    <div className="head colhead_dark">{title}</div>
    <ul className="stats nobullet">
      {Object.keys(data).map((key) => (
        <li key={key}>
          {key}: <span className="tooltip">{data[key]}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
