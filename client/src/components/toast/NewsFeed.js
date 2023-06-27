import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news_feed', {
          params: {
            count: 5,
            offset: 0,
          },
        });

        if (response.data && response.data.status === 'success') {
          setNewsItems(JSON.parse(response.data.data));
        } else {
          setError('Failed to fetch news');
        }
      } catch (error) {
        setError('Failed to fetch news');
      }
    };

    fetchNews();
  }, []);

  const renderNews = () => {
    return newsItems.map((news, index) => (
      <div key={index} className="news-item">
        <h2>{news[1]}</h2>
        <span>{news[2]}</span>
        <p dangerouslySetInnerHTML={{ __html: news[3] }} />
      </div>
    ));
  };

  return (
    <div className="news-feed">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        renderNews()
      )}
    </div>
  );
};

export default NewsFeed;
