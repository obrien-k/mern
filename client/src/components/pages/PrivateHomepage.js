import React, { useEffect, useState } from 'react';
import Stats from './Stats';
import Polls from './Polls';
import Recommendations from './Recommendations';
import FeaturedAlbum from './FeaturedAlbum';
import VanityAlbum from './VanityAlbum';
import News from './News';
import sampleData from './sampleData.json'; // temp
import PrivateFooter from '../layout/PrivateFooter';

function PrivateHomepage() {
  console.log("Rendering PrivateHomepage");
    const [data, setData] = useState(null);

    useEffect(() => {
      // Temporary: Use sample data instead of fetching from API
      setData(sampleData);
      /*
        fetch('/api/privateStats')
            .then(response => response.json())
            .then(data => setData(data));*/
    }, []);

    return (
        <div className="private-homepage">
          <div id="content">
            <div className="thin">
              <div className="sidebar"> 
              <Stats data={data?.stats} />
              <Polls data={data?.polls} />
              <Recommendations data={data?.recommendations} />
              <FeaturedAlbum />
              <VanityAlbum />
            </div>
            <div className="main_column">
              <News data={data?.news} />
            </div>
           </div>
            <PrivateFooter
            options={data?.options}
            userSessions={data?.userSessions}
            scriptStartTime={data?.scriptStartTime}
            siteLaunchYear={data?.siteLaunchYear}
            siteName={data?.siteName}
            />
            </div>
        </div>
    );
}

export default PrivateHomepage;
