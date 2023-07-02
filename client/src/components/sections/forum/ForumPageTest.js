import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForumData } from '../../../hooks/useForumData';

const ForumPageTest = () => {
  const { forumId } = useParams();
  
  const { data: forumData, isLoading, errorMessage } = useForumData(forumId);

  useEffect(() => {
    console.log(JSON.stringify(forumData) + 'FORUM PAGE TEST USE EFFECT');
    
  }, [forumData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div><pre>Error: {JSON.stringify(errorMessage, null, 2)}</pre></div>;
  }
  
  if (!forumData || !forumData.length) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      {forumData.map((category) => (
        <div key={category._id}>
          <h2>{category.Name}</h2>
          {category.Forums.map((forum) => (
            <div key={forum._id}>
              <h3>{forum.Name}</h3>
              <p>{forum.Description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );  
};

export default ForumPageTest;
