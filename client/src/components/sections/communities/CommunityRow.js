import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const CommunityRow = ({ community }) => {
  return (
    <tr className="torrent">
      <td></td>
      <td className="center cats_col m_cats_col m_td_left">
        <div className={community.tooltipClass}></div>
      </td>
      <td className="td_info big_info">
        <div className="group_info clear">
          <span>
            [<Link to={`/communities/${community._id}/consume`} className="tooltip">DL</Link> | <Link to={`/communities/${community._id}/report`} className="tooltip">RP</Link>]
          </span>
          <Link to={`/communities/${community._id}`} className="tooltip" dir="ltr">{community.name}</Link>
          <div className={community.communityInfoClass}></div>
        </div>
      </td>
      <td className="td_file_count">{community.files}</td>
      <td className="td_time nobr"><span className="time tooltip">{community.time}</span></td>
      <td className="td_size number_column nobr">{community.size}</td>
      <td className="td_snatched m_td_right number_column">{community.snatches}</td>
      <td className="td_seeders m_td_right number_column">{community.contributors}</td>
      <td className="td_leechers m_td_right number_column">{community.consumers}</td>
    </tr>
  );
};

CommunityRow.propTypes = {
  community: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    tooltipClass: PropTypes.string,
    communityLink: PropTypes.string,
    name: PropTypes.string.isRequired,
    communityInfoClass: PropTypes.string,
    tags: PropTypes.string,
    files: PropTypes.number,
    time: PropTypes.string,
    size: PropTypes.string,
    snatches: PropTypes.number,
    contributors: PropTypes.number,
    consumers: PropTypes.number,
  })
};

export default CommunityRow;