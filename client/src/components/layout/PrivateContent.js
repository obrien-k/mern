import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForumListData from '../sections/forum/ForumListData';
import ForumPage from '../sections/forum/ForumPage';
import PrivateHomepage from '../pages/PrivateHomepage';
import Toolbox from '../admin/Toolbox';
import InviteForm from '../profile/invite/InviteForm';
import InviteTree from '../profile/invite/InviteTree';
import PermissionManager from '../admin/PermissionManager';
import NewTopicForm from '../sections/forum/NewTopicForm';

const PrivateContent = ({userId, userName}) => {
  return (
    <div id="content">
      <Routes>
        <Route path='/forums/:forumID/new-topic' element={<NewTopicForm userId={userId}/>} />
        <Route path="/forums/:forumID" element={<ForumPage />} />
        <Route path="/forums" element={<ForumListData />} />
        <Route path="/invite" element={<InviteForm userId={userId} userName={userName} />} />
        <Route path="/user/invite-tree" element={<InviteTree userId={userId} />} />
        <Route path="/tools/permissions" element={<PermissionManager userId={userId} />} />
        <Route path="/tools" element={<Toolbox userId={userId} />}/>
        <Route path="/*" element={<PrivateHomepage userId={userId} />} />
      </Routes>
    </div>
  );
};

export default PrivateContent;
