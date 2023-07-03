import React from 'react';
import { useAllCommunitiesData } from '../../../hooks/useAllCommunitiesData';
import CommunitiesTable from './CommunitiesTable';

const CommunitiesPage = () => {
  const { data, isLoading, errorMessage } = useAllCommunitiesData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }


  return (
    <CommunitiesTable communities={data} />
  );
};

export default CommunitiesPage;
