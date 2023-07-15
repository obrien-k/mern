import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById } from "../../actions/profile";
import Sidebar from "./Sidebar";
import MainColumn from "./MainColumn";

function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userProfile, loadingUserProfiles, userProfileError } = useSelector(
    (state) => {
      const userId = id;
      const profiles = state.profile.userProfile;
      const userProfile = Object.values(profiles).find(
        (profile) => profile.user === userId
      );

      return {
        userProfile,
        loadingUserProfiles: state.profile.loadingUserProfile,
        userProfileError: state.profile.userProfileError,
      };
    }
  );

  useEffect(() => {
    dispatch(getUserProfileById(id));
  }, [dispatch, id]);

  if (loadingUserProfiles || !userProfile) {
    return <div>Loading profile...</div>;
  }

  if (userProfileError)
    return (
      <div className="thin">
        <div className="header">
          <h2>
            <strong>{userProfileError}</strong>
          </h2>
        </div>
      </div>
    );

  return userProfile ? (
    <div className="thin">
      <div className="header">
        <h2>
          <strong>
            <Link to={`/private/user/${userProfile._id}`}>
              {userProfile.username}
            </Link>
          </strong>
        </h2>
      </div>
      <div className="linkbox">
        <Link to={`/user/edit/${userProfile._id}`} className="brackets">
          Settings
        </Link>
      </div>
      <Sidebar profile={userProfile} />
      <MainColumn profile={userProfile} />
    </div>
  ) : null;
}

export default UserProfile;
