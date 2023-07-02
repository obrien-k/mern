import React from 'react';
import { useAllForumsData } from '../../../hooks/useAllForumsData'; 
import ForumList from './ForumList';

const ForumListData = () => {
  const { data: combinedData, isLoading, errorMessage } = useAllForumsData();

  console.log('combinedData', combinedData);
  console.log('isLoading', isLoading);
  console.log('errorMessage', errorMessage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (combinedData && Array.isArray(combinedData) && combinedData.length > 0) {
    console.log('Passing data to ForumList', combinedData);
    return <ForumList forums={combinedData} />;
  } else {
    console.log('No data to display');
    return <div>No data to display</div>;
  }
};


export default ForumListData;
