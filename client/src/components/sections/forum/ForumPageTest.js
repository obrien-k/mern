import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForumData } from '../../../hooks/useForumData';

const ForumPageTest = () => {
  const { forumId } = useParams();
  
  const { data: forumData, isLoading, errorMessage } = useForumData(forumId);

  useEffect(() => {
    console.log(forumData); // Log the forumData to the console
  }, [forumData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }
  
  if (!forumData || !forumData.topics) {
    return <div>No data available</div>;
  }

  console.log('forumData', forumData);
  

  return (
      <div>
        {forumData && forumData.map(category => (
          <div key={category.id}>
            <h2>Category: {category.name}</h2>
            {category.forums && category.forums.map(forum => (
              <div key={forum._id}>
                <h3>Forum: {forum.name}</h3>
                {forum.topics && forum.topics.map(topic => (
                  <div key={topic._id}>
                    <span>Topic: {topic.title}</span>
                    <span> by {topic.author ? topic.author.name : 'Unknown'}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
  );
};

export default ForumPageTest;
