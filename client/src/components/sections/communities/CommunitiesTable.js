import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommunityRow from './CommunityRow';
import GroupRow from './GroupRow';

const TableHeader = () => (
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
          <img src="/static/styles/public/images/seeders.png" className="tooltip" alt="Contributors" title="Seeders" />
        </a>
      </td>
      <td className="sign leechers">
        <a href="?order_way=desc&order_by=leechers">
          <img src="/static/styles/public/images/leechers.png" className="tooltip" alt="Consumers" title="Leechers" />
        </a>
      </td>
    </tr>
  </thead>
);

const NoCommunitiesMessage = () => (
  <tr>
    <td colSpan="9">No communities to display</td>
  </tr>
);

const CommunitiesTable = ({ communities }) => {
  return (
    <table className="torrent_table cats grouping m_table" id="torrent_table">
      <TableHeader />
      <tbody>
        {communities.length > 0 ? (
          communities.map(community => (
            <React.Fragment key={community._id}>
                {/* Community Row */}
                <CommunityRow community={community} />
        
                {/* Group Rows */}
                {community.groups &&
                community.groups.map(group => (
                    <GroupRow key={group._id} group={group} />
                ))}
            </React.Fragment>
        ))
        ) : (
          <NoCommunitiesMessage />
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