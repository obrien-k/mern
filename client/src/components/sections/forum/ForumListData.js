import React from 'react';
import { useAllForumsData } from '../../../hooks/useAllForumsData'; 
import ForumList from './ForumList';

const ForumListData = () => {
  const { data: combinedData, isLoading, errorMessage } = useAllForumsData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (combinedData && Array.isArray(combinedData) && combinedData.length > 0) {
    return <ForumList forums={combinedData} />;
  } else {
    return <div>No data to display</div>;
  }
};


export default ForumListData;
