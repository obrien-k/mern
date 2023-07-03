import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommunities, getCommunityGroups } from '../actions/communities';

function getTooltipType(communityType) {
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

function transformData(data, groupData) {
  return data.map(community => {
    const groups = groupData(community._id);
    
    return {
      name: community.name,
      tooltipClass: getTooltipType(community.type) + ' ' + 'tags_test',
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
    if (communities && !loadingCommunities) {
      communities.forEach((community) => {
        dispatch(getCommunityGroups(community._id));
      });
    }
  }, [communities, dispatch, loadingCommunities]);

  const groupData = (communityId) => {
    return communityGroups.find((group) => group.community === communityId);
  };

  if (!communities || loadingCommunities || loadingCommunityGroups) {
    return { isLoading: true, errorMessage: error };
  }

  const data = transformData(communities, groupData);

  return { data, isLoading: false, errorMessage: error };
};