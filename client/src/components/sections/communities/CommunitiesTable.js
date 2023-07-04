import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommunitiesTable = ({ communities }) => {
  console.log(communities);
  return (
    <table className="torrent_table cats grouping m_table" id="torrent_table">
      <thead>
        <tr className="colhead">
          <td className="small"></td>
          <td className="small cats_col"></td>
          <td className="m_th_left m_th_left_collapsable" width="100%">
            Name / <a href="?order_way=desc&order_by=year">Year</a>
          </td>
          <td>Files</td>
          <td><a href="?order_way=asc&order_by=time">Time</a></td>
          <td><a href="?order_way=desc&order_by=size">Size</a></td>
          <td className="sign snatches">
            <a href="?order_way=desc&order_by=snatched">
              <img src="/static/styles/public/images/snatched.png" className="tooltip" alt="Snatches" title="Snatches" />
            </a>
          </td>
          <td className="sign seeders">
            <a href="?order_way=desc&order_by=seeders">
              <img src="/static//styles/public/images/seeders.png" className="tooltip" alt="Contributors" title="Seeders" />
            </a>
          </td>
          <td className="sign leechers">
            <a href="?order_way=desc&order_by=leechers">
              <img src="/static/styles/public/images/leechers.png" className="tooltip" alt="Consumers" title="Leechers" />
            </a>
          </td>
        </tr>
      </thead>
      <tbody>
        {communities.length > 0 ? (
          communities.map(community => (
            <React.Fragment key={community.id}>
              {/* Community Row */}
              <tr key={`community-row-${community._id}`} className="torrent">
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

              {/* Group Rows */}
              {community.groups &&
              community.groups.map((group, index) => (
                <React.Fragment key={group._id}>
                  {/* Group Row */}
                  <tr key={`group-row-${group._id}`} className="group">
                    <td className="td_collapse center m_td_left">
                      <div id="showimg_2" className="hide_torrents" key={`group-div-${group._id}`}>
                        <Link to='#' className='tooltip show_torrents_link'></Link>
                        </div>
                    </td>
                    <td className="center cats_col">
                      {/* Replace this with relevant data */}
                      <div className={group.type}></div>
                    </td>
                    <td colSpan='2' className="td_info big_info">
                      <div className="group_info clear">
                        <Link to={`${group.community._id}`} className="tooltip" dir="ltr">{group.community.name}</Link> -
                        <Link to={`${group.community._id}/groups/${group._id}`} className='tooltip' dir='ltr'>{group.title}</Link> <p>{group.year} 'todo group.release_type'</p>
                        <span className="add_bookmark float_right">
                        <Link to="#" id="bookmarklink_torrent_2" className="brackets" Bookmark={('group', 2, 'Remove bookmark')}>Bookmark</Link>
                        </span>
                      {/* Replace the links and data below with relevant data */}
                      <span>
                        [<Link to={`/groups/${group._id}/consume`} className="tooltip">DL</Link> | <Link to={`/groups/${group._id}/report`} className="tooltip">RP</Link>]
                      </span>
                      <div className={group.tooltipClass}></div>
                      </div>
                    </td>
                    <td className="td_time nobr"><span className="time tooltip">{group.time}</span></td>
                    <td className="td_size number_column nobr">{group.size}</td>
                    <td className="td_snatched m_td_right number_column">{group.snatches}</td>
                    <td className="td_seeders m_td_right number_column">{group.contributors}</td>
                    <td className="td_leechers m_td_right number_column">{group.consumers}</td>
                  </tr>
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
      groups: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
      ),
    })
  ).isRequired,
};


export default CommunitiesTable;