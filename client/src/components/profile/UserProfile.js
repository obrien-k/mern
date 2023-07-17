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

  useEffect(() => {
    dispatch(getUserProfileById(id));
  }, [dispatch, id]);

  const [currentProfile, setCurrentProfile] = React.useState(null);

  const userProfile = useSelector((state) => {
    const profiles = state.profile.userProfile;
    return Object.values(profiles).find((profile) => profile.user === id);
  });

  useEffect(() => {
    if (userProfile) {
      setCurrentProfile(userProfile);
    }
  }, [userProfile]);

  const loadingUserProfile = useSelector(
    (state) => state.profile.loadingUserProfile
  );
  const userProfileError = useSelector(
    (state) => state.profile.userProfileError
  );

  if (loadingUserProfile) {
    return <div>Loading profile...</div>;
  }
  if (userProfileError && Object.keys(userProfileError).length > 0) {
    const errorMessage =
      userProfileError || "An error occurred while fetching data";
    return <div>Error: {errorMessage}</div>;
  }

  return currentProfile ? (
    <div className="thin">
      <div className="header">
        <h2>
          <strong>
            <Link to={`/private/user/${currentProfile._id}`}>
              {currentProfile.username}
            </Link>
          </strong>
        </h2>
      </div>
      <div className="linkbox">
        <Link to={`/user/edit/${currentProfile._id}`} className="brackets">
          Settings
        </Link>
      </div>
      <Sidebar profile={currentProfile} />
      <MainColumn profile={currentProfile} />
    </div>
  ) : (
    <div className="thin">
      <div className="header">
        <h2>Error: User not found</h2>
      </div>
    </div>
  );
}

export default UserProfile;
