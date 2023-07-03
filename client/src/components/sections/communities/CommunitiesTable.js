import React from 'react';

const CommunitiesTable = ({ communities }) => {
  return (
    <table className="community_table cats grouping m_table" id="community_table">
      <thead>
        <tr className="colhead">
          <td className="small"></td>
          <td className="small cats_col"></td>
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
        {communities.map((community, index) => (
          <tr className="community" key={index}>
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
        ))}
      </tbody>
    </table>
  );
};

export default CommunitiesTable;
