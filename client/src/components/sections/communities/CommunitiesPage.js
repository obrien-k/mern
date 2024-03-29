import React from "react";
import { useAllCommunities } from "../../../hooks/useAllCommunities";
import CommunitiesTable from "./CommunitiesTable";

const CommunitiesPage = () => {
  const { transformedData, isLoading, errorMessage } = useAllCommunities();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage && Object.keys(errorMessage).length > 0) {
    return <div>Error: {JSON.stringify(errorMessage)}</div>;
  }

  if (isLoading === false && transformedData.length > 0) {
    console.log(transformedData);
  }
  return (
    <div>
      <div>
        <CommunitiesTable communities={transformedData} />
      </div>
    </div>
  );
};

export default CommunitiesPage;
