import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { createSelector } from 'reselect'; should implement memoization, decouple these components
import { getAllCommunities, getCommunityGroups } from '../actions/communities';

//const getCommunities = (state) => state.communities.communities;
//const getAllCommunityGroups = (state) => state.communities.communityGroups;
//const getError = (state) => state.communities.error;

const getTooltipClasses = (communityType) => {
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
};

// Define a memoized selector
/* BROKEN https://www.youtube.com/watch?v=i2dYO_dgKBk
const selectCommunitiesData = createSelector(
  [getCommunities, getAllCommunityGroups, getError],
  (communities, communityGroups, error) => {
    const transformedData = communities.map((community) => {
      const groups = communityGroups.filter(
        (group) => group.community._id === community._id
      );

      return {
        _id: community._id,
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
        contributors: community.seeders || 0,
        consumers: community.leechers || 0,
        groups: groups.length > 0 ? groups : [] // Attach groups to each community, if none exists send an empty array
      };
    });

    return { transformedData, error };
  }
);
*/
export const useAllCommunitiesData = () => {
  const dispatch = useDispatch();
  const { communities, communityGroups, error } = useSelector((state) => state.communities);
  
  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (communities && communities.length > 0) {
      communities.forEach((community) => {
        dispatch(getCommunityGroups(community._id));
      });
    }
  }, [communities, dispatch]);

  const transformedData = useMemo(() => {
    return communities.map((community) => {
      const groups = communityGroups.filter((group) => group.community._id === community._id);

      return {
        _id: community._id,
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
        contributors: community.seeders || 0,
        consumers: community.leechers || 0,
        groups: groups.length > 0 ? groups : []
      };
    });
  }, [communities, communityGroups]);

  useEffect(() => {
    if (error && Object.keys(error).length !== 0) {
      console.error('Error fetching communities:', error);
      // Handle the error according to your application's requirements.
    }
  }, [error]);

  const isLoading = communities.length === 0;

  return { transformedData, isLoading, errorMessage: error };
};