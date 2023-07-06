import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const GroupRow = ({ group }) => {
  return (
    <tr className="group">
      <td className="td_collapse center m_td_left">
        <div id="showimg_2" className="hide_torrents">
          <Link to="#" className="tooltip show_torrents_link"></Link>
        </div>
      </td>
      <td className="center cats_col">
        <div className={group.type}></div>
      </td>
      <td colSpan="2" className="td_info big_info">
        <div className="group_info clear">
          <Link to={`${group.community._id}`} className="tooltip" dir="ltr">
            {group.community.name}
          </Link>{" "}
          -{" "}
          <Link to={`${group.community._id}/groups/${group._id}`} className="tooltip" dir="ltr">
            {group.title}
          </Link>{" "}
          <p>
            {group.year} 'todo group.release_type'
          </p>
          <span className="add_bookmark float_right">
            <Link to="#" id="bookmarklink_torrent_2" className="brackets" Bookmark={("group", 2, "Remove bookmark")}>
              Bookmark
            </Link>
          </span>
          <span>
            [
            <Link to={`/groups/${group._id}/consume`} className="tooltip">
              DL
            </Link>{" "}
            |{" "}
            <Link to={`/groups/${group._id}/report`} className="tooltip">
              RP
            </Link>
            ]
          </span>
          <div className={group.tooltipClass}></div>
        </div>
      </td>
      <td className="td_time nobr">
        <span className="time tooltip">{group.time}</span>
      </td>
      <td className="td_size number_column nobr">{group.size}</td>
      <td className="td_snatched m_td_right number_column">{group.snatches}</td>
      <td className="td_seeders m_td_right number_column">{group.contributors}</td>
      <td className="td_leechers m_td_right number_column">{group.consumers}</td>
    </tr>
  );
};

GroupRow.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string,
    community: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    tooltipClass: PropTypes.string,
    time: PropTypes.string,
    size: PropTypes.string,
    snatches: PropTypes.number,
    contributors: PropTypes.number,
    consumers: PropTypes.number,
  }).isRequired,
};

export default GroupRow;