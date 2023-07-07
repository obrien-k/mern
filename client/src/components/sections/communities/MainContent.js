import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommunityGroups } from "../../../actions/communities";

const MainContent = ({
  getCommunityGroups,
  communityGroups,
  loading,
  communityId,
}) => {
  useEffect(() => {
    if (communityId) {
      getCommunityGroups(communityId);
    }
  }, [getCommunityGroups, communityId]);

  return (
    <main>
      <h2>Groups</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {communityGroups.map((group) => (
            <li key={group._id}>{group.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

const mapStateToProps = (state) => ({
  communityGroups: state.communities.communityGroups,
  loading: state.communities.loadingcommunityGroups,
});

export default connect(mapStateToProps, { getCommunityGroups })(MainContent);
