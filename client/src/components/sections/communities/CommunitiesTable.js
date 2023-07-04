import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommunitiesTable = ({ communities }) => {
  return (
    <table className="community_table cats grouping m_table" id="community_table">
      <thead>
        <tr className="colhead">
          <td className="small" aria-label="Empty cell"></td>
          <td className="small cats_col" aria-label="Empty cell"></td>
          <td className="m_th_left m_th_left_collapsable" width="100%">Name / Year</td>
          <td>Files</td>
          <td>Time</td>
          <td>Size</td>
          <td className="sign snatches">Snatches</td>
          <td className="sign seeders">Seeders</td>
          <td className="sign leechers">Leechers</td>
        </tr>
      </thead>
      <tbody>
        {communities.length > 0 ? (
          communities.map(community => (
            <React.Fragment key={community.id || community.name}>
              {/* Community Row */}
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
                  <div className="tags"><Link to={`/communities/${community._id}/tags`}>{community.tags}</Link></div>
                </div>
              </td>
              <td className="td_file_count">{community.files}</td>
              <td className="td_time nobr"><span className="time tooltip">{community.time}</span></td>
              <td className="td_size number_column nobr">{community.size}</td>
              <td className="td_snatched m_td_right number_column">{community.snatches}</td>
              <td className="td_seeders m_td_right number_column">{community.contributors}</td>
              <td className="td_leechers m_td_right number_column">{community.consumers}</td>
            </tr>

              {/* Group Rows */}
              {community.groups && community.groups.map(group => (
                <React.Fragment key={group._id || group.name}>
                  {/* Group Row */}
                  <tr className="group">
                    <td></td>
                    <td className="center cats_col">
                      {/* Replace this with relevant data */}
                      <div className={group.type}></div>
                    </td>
                    <td className="td_info">
                      {/* Replace the links and data below with relevant data */}
                      <span>
                        [<Link to={`/groups/${group._id}/consume`} className="tooltip">DL</Link> | <Link to={`/groups/${group._id}/report`} className="tooltip">RP</Link>]
                      </span>
                      <a href={`/groups/${group._id}/consume`} className="tooltip" dir="ltr">{group.title}</a>
                      <div className={group.tooltipClass}></div>
                      <div className="tags"><a href={`/groups/${group._id}/tags`}>{group.tags}</a></div>
                    </td>
                    {/* ... other table cells for the group ... */}
                  </tr>
                  
                  {/* Contributions Rows within Group */}
                  {group.contributions && group.contributions.map(contribution => (
                    <tr className="group_contribution" key={contribution._id || contribution.name}>
                      <td></td>
                      <td className="center cats_col">
                        {/* Replace this with relevant data */}
                        <div className={contribution.tooltipClass}></div>
                      </td>
                      <td className="td_info">
                        <a href={`#contribution/${contribution._id}`} className="tooltip" dir="ltr">{contribution.name}</a>
                      </td>
                      {/* ... other table cells for the contribution ... */}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="9">No communities to display</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

CommunitiesTable.propTypes = {
  communities: PropTypes.arrayOf(
    PropTypes.shape({
      tooltipClass: PropTypes.string,
      communityLink: PropTypes.string,
      name: PropTypes.string.isRequired,
      communityInfoClass: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.number),
      tag: PropTypes.string,
      files: PropTypes.number,
      time: PropTypes.string,
      size: PropTypes.string,
      snatches: PropTypes.number,
      seeders: PropTypes.arrayOf(PropTypes.string),
      leechers: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default CommunitiesTable;