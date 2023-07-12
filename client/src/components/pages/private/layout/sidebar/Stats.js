import React from 'react';
import Collages from './Collages';
import Requests from './Requests';
import Snatches from './Snatches';
import Peers from './Peers';

function Stats({ data }) {
    if (!data) return null;

    return (
      <div className="box">
      <div className="head colhead_dark">
          <strong>Stats</strong>
      </div>
      <ul className="stats nobullet">
          <li>Maximum users: {data.maxUsers}</li>
          <li>Enabled users: {data.enabledUsers} <a href="stats.php?action=users" className="brackets">Details</a></li>
          <li>Users active today: {data.activeToday}</li>
          <li>Users active this week: {data.activeWeek}</li>
          <li>Users active this month: {data.activeMonth}</li>
          <li>Communities: {data.communities}</li>
          <li>Releases: {data.releases}</li>
          <li>Artists: {data.artists}</li>
          <li><Collages data={data.collages} /></li>
          <li><Requests data={data.requests} /></li>
          <li><Snatches data={data.snatches} /></li>
          <li><Peers data={data.peers} /></li>
          <li>Seeders: {data.seeders}</li>
          <li>Leechers: {data.leechers}</li>
          <li>Seeder/leecher ratio: {data.ratio}</li>
        </ul>
        
        
        
        <Peers data={data.peers} />
        </div>
    );
}

export default Stats;
