import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from './FallbackComponent';
import ForumListData from '../sections/forum/ForumListData';
// import ForumPage from '../sections/forum/ForumPage';
import ForumPageTest from '../sections/forum/ForumPageTest';
import PrivateHomepage from '../pages/PrivateHomepage';
import Toolbox from '../admin/Toolbox';
import InviteForm from '../profile/invite/InviteForm';
import InviteTree from '../profile/invite/InviteTree';
import PermissionManager from '../admin/PermissionManager';
import NewTopicForm from '../sections/forum/NewTopicForm';

const logErrorToService = (error, info) => {
  //TODO
  console.log(error, info);
};

const PrivateContent = ({userId, userName}) => {
  return (
    <div id="content">
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={logErrorToService}
        onReset={() => {
          // Reset the state of your app so the error doesn't happen again
        }}>
        <Routes>
          <Route path='/forums/:forumId/new-topic' element={<NewTopicForm userId={userId}/>} />
          <Route path="/forums/:forumId" element={<ForumPageTest />} />
          <Route path="/forums" element={<ForumPageTest />} />
          <Route path="/invite" element={<InviteForm userId={userId} userName={userName} />} />
          <Route path="/user/invite-tree" element={<InviteTree userId={userId} />} />
          <Route path="/tools/permissions" element={<PermissionManager userId={userId} />} />
          <Route path="/tools" element={<Toolbox userId={userId} />} />
          <Route path="/*" element={<PrivateHomepage userId={userId} />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default PrivateContent;
