import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommunities, getCommunityGroups } from '../actions/communities';

function getTooltipClasses(communityType) {
  switch (communityType) {
    case 'Comics':
      return 'tooltip cats_comics';
    case 'Music':
      return 'tooltip cats_music tags_rock';
    case 'Applications':
      return 'tooltip cats_applications';
    case 'E-Books':
      return 'tooltip cats_ebooks';
    case 'E-Learning Videos':
      return 'tooltip cats_elearningvideos';
    case 'Audiobooks':
      return 'tooltip cats_audiobooks';
    case 'Comedy':
      return 'tooltip cats_comedy';
    default:
      return 'tooltip tags_test';
  }
}

function transformData(data, communityGroups) {
  return data.map(community => {
    const groups = communityGroups.filter(group => group.community._id === community._id);

    return {
      name: community.name,
      tooltipClass: getTooltipClasses(community.type) + ' ' + 'tags_test',
      downloadLink: `communities/download/${community._id}`,
      reportLink: `reportsv2/report/${community._id}`,
      communityLink: `communities/${community._id}`,
      communityInfoClass: 'community_info',
      tagLink: `communities/basic/taglist/${community.type}`,
      tag: community.type,
      files: community.files || 0,
      time: community.time || 'N/A',
      size: community.size || 'N/A',
      snatches: community.snatches || 0,
      seeders: community.contributors || 0,
      leechers: community.consumers || 0,
      groups: groups // Attach groups to each community
    };
  });
}

export const useAllCommunitiesData = () => {
  const dispatch = useDispatch();

  const { communities, loadingCommunities, communityGroups, loadingCommunityGroups, error } = useSelector((state) => ({
    communities: state.communities.communities,
    loadingCommunities: state.communities.loadingCommunities,
    communityGroups: state.communities.communityGroups,
    loadingCommunityGroups: state.communities.loadingCommunityGroups,
    error: state.communities.error,
  }));

  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (!loadingCommunities && loadingCommunityGroups) {
      communities.forEach((community) => {
        dispatch(getCommunityGroups(community._id));
      });
    }
  }, [communities, communityGroups, dispatch, loadingCommunities, loadingCommunityGroups]);

  const handleError = () => {
    if (error) {
      console.error('Error fetching communities:', error);
      // Handle the error according to your application's requirements.
    }
  };

  handleError();

  const data = !loadingCommunityGroups ? transformData(communities, communityGroups) : [];

  return { data, isLoading: loadingCommunities || loadingCommunityGroups, errorMessage: error };
};