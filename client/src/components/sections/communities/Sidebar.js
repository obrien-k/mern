import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCommunityById } from "../../../actions/communities";

const Sidebar = ({ getCommunityById, community, loading, communityId }) => {
  useEffect(() => {
    getCommunityById(communityId);
  }, [getCommunityById, communityId]);

  return (
    <aside>
      <h2>Communities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>{community && <li>{community.name}</li>}</ul>
      )}
    </aside>
  );
};

const mapStateToProps = (state) => ({
  community: state.communities.community,
  loading: state.communities.loading,
});

export default connect(mapStateToProps, { getCommunityById })(Sidebar);
