import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { getAllCommunities, getCommunityGroups } from '../actions/communities';

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


export const useAllCommunitiesData = () => {
  const dispatch = useDispatch();
  const { communities, communityGroups, error } = useSelector((state) => state.communities);
  
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [loadingCommunityGroups, setLoadingCommunityGroups] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      await dispatch(getAllCommunities());
      setLoadingCommunities(false);
    };
    fetchCommunities();
  }, [dispatch]);

  useEffect(() => {
    if (communities && communities.length > 0) {
      setLoadingCommunityGroups(true);
      batch(() => {
        const groupPromises = communities.map((community) => dispatch(getCommunityGroups(community._id)));
        Promise.all(groupPromises).then(() => setLoadingCommunityGroups(false));
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
        groups: groups.map(group => {
          const year = group.isEdition && group.edition ? group.edition.year : undefined;
          const contributors = Array.isArray(group.contributors) ? group.contributors.length : group.contributors;
          const consumers = Array.isArray(group.consumers) ? group.consumers.length : group.consumers;
          return {
            ...group,
            year,
            contributors,
            consumers
          };
        })
      };
    });
  }, [communities, communityGroups]);

  useEffect(() => {
    if (error && Object.keys(error).length !== 0) {
      console.error('Error fetching communities:', error);
      // Handle the error according to your application's requirements.
    }
  }, [error]);

  const isLoading = loadingCommunities || loadingCommunityGroups;

  return { transformedData, isLoading, errorMessage: error };
};