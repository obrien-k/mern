import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForumListData from '../sections/forum/ForumListData';
import ForumPage from '../sections/forum/ForumPage';
import PrivateHomepage from '../pages/PrivateHomepage';

const PrivateContent = ({userId}) => {
  return (
    <div id="content">
      <Routes>
        <Route path="/forums" element={<ForumListData />} />
        <Route path="/forums/:forumID" element={<ForumPage />} />
        <Route path="/*" element={<PrivateHomepage userId={userId} />} />
      </Routes>
    </div>
  );
};

export default PrivateContent;
