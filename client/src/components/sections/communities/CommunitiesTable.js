import React from 'react';
import PropTypes from 'prop-types';

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
            <tr className="community" key={community.id || community.name}>
              <td></td>
              <td className="center cats_col m_cats_col m_td_left">
                <div className={community.tooltipClass}></div>
              </td>
              <td className="td_info big_info">
                <div className="group_info clear">
                  <span>
                    [<a href={community.downloadLink} className="tooltip">DL</a> | <a href={community.reportLink} className="tooltip">RP</a>]
                  </span>
                  <a href={community.communityLink} className="tooltip" dir="ltr">{community.name}</a>
                  <div className={community.communityInfoClass}></div>
                  <div className="tags"><a href={community.tagLink}>{community.tag}</a></div>
                </div>
              </td>
              <td className="td_file_count">{community.files}</td>
              <td className="td_time nobr"><span className="time tooltip">{community.time}</span></td>
              <td className="td_size number_column nobr">{community.size}</td>
              <td className="td_snatched m_td_right number_column">{community.snatches}</td>
              <td className="td_seeders m_td_right number_column">{community.seeders}</td>
              <td className="td_leechers m_td_right number_column">{community.leechers}</td>
            </tr>
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
      downloadLink: PropTypes.string,
      reportLink: PropTypes.string,
      communityLink: PropTypes.string,
      name: PropTypes.string.isRequired,
      communityInfoClass: PropTypes.string,
      tagLink: PropTypes.string,
      tag: PropTypes.string,
      files: PropTypes.number,
      time: PropTypes.string,
      size: PropTypes.string,
      snatches: PropTypes.number,
      seeders: PropTypes.number,
      leechers: PropTypes.number,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default CommunitiesTable;