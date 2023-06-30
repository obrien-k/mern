import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForumListData from '../sections/forum/ForumListData';

const PrivateContent = () => {
  return (
    <div id="content">
      <Routes>
        <Route path="/forums" element={<ForumListData />} />
      </Routes>
    </div>
  );
};

export default PrivateContent;
