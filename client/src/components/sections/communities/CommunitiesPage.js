import React from 'react';
import { useAllCommunitiesData } from '../../../hooks/useAllCommunitiesData';
import CommunitiesTable from './CommunitiesTable';

const CommunitiesPage = () => {
  const { transformedData, isLoading, errorMessage } = useAllCommunitiesData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  return (
    <div>
      <div><CommunitiesTable communities={transformedData} /></div>
    </div>
  );
};

export default CommunitiesPage;
