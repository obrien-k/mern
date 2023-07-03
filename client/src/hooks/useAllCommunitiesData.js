import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommunities } from '../actions/communities';

function transformData(data) {
  return data.map(community => ({
    name: community.name,
    tooltipClass: 'tooltip cats_comics tags_test', // example, this can be set based on the community type or some other property
    downloadLink: `communities.php?action=download&id=${community._id}`, // You can modify the URL format if needed
    reportLink: `reportsv2.php?action=report&id=${community._id}`,
    communityLink: `communities.php?id=${community._id}`,
    communityInfoClass: 'community_info', // example, this can be set based on the community type or some other property
    tagLink: `communities.php?action=basic&taglist=${community.type}`,
    tag: community.type,
    files: community.files || 0, // set defaults or fetch this information from the API
    time: community.time || 'N/A', // set defaults or fetch this information from the API
    size: community.size || 'N/A', // set defaults or fetch this information from the API
    snatches: community.snatches || 0, // set defaults or fetch this information from the API
    seeders: community.seeders || 0, // set defaults or fetch this information from the API
    leechers: community.leechers || 0, // set defaults or fetch this information from the API
  }));
}

export const useAllCommunitiesData = () => {
  const dispatch = useDispatch();

  const { communities, loadingCommunities, error } = useSelector((state) => ({
    communities: state.communities.communities,
    loadingCommunities: state.communities.loadingCommunities,
    error: state.communities.error,
  }));

  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);

  useEffect(() => {
    console.log('Communities data has changed:', communities);
  }, [communities]);   

  console.log("Communities from redux:", communities);

  if (!communities) {
    return { isLoading: true };
  }

  const data = transformData(communities);

  console.log("Transformed data:", data);

  return { data, isLoading: loadingCommunities, errorMessage: error };
};
