// ForumList.js
import React from 'react';

const ForumList = ({ forums }) => {
    console.log('ForumList component, received forums:', forums);
  
    // Make sure forums is not null and is an array before rendering
    if (!forums || !Array.isArray(forums)) {
      return <div>No data to display</div>;
    }
  
    return (
      <div>
        <h2>Forums List</h2>
        <ul>
          {forums.map(category => (
            <li key={category._id}>
              <h3>{category.Name}</h3>
              <ul>
                {category.Forums.map(forum => (
                  <li key={forum._id}>
                    <h3>{forum.Name}</h3>
                    <p>{forum.Description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );  
  };
  

export default ForumList;
