import React, { useEffect, useState } from 'react';
import Stats from './sidebar/Stats';
import Polls from './sidebar/Polls';
import Recommendations from './sidebar/Recommendations';
import FeaturedAlbum from './sidebar/FeaturedAlbum';
import VanityAlbum from './sidebar/VanityAlbum';
import News from './sidebar/News';
import sampleData from './sampleData.json'; // temp

function PrivateHomepage({userId}) {
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
          </div>
        </div>
    );
}

export default PrivateHomepage;
