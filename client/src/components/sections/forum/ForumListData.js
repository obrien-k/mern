import React from 'react';
import { useForumData } from '../../../hooks/useForumData';
import ForumList from './ForumList';

const ForumListData = () => {
  const { data: combinedData, isLoading, errorMessage } = useForumData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  // Pass the combinedData to the ForumList component
  return <ForumList combinedData={combinedData} />;
};

export default ForumListData;
