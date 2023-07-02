import React from 'react';
import { Link } from 'react-router-dom';
import './ForumList.css';

//todo forgot to add forum tooltip to model ?

const ForumList = ({ combinedData }) => {
  console.log(combinedData + "FORUM LIST LOG"); // Add this line to check what's inside combinedData

  if (!Array.isArray(combinedData)) {
      return <div>Forums data is not available or in an unexpected format.</div>;
  }
  return (
    <div>
      <div><pre>{JSON.stringify(combinedData, null, 2)}</pre></div>
    </div>
  );
};

export default ForumList;
