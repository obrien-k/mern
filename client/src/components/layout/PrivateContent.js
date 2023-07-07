import React from "react";
import { Route, Routes } from "react-router-dom";
import ForumListData from "../sections/forum/ForumListData";
import ForumPage from "../sections/forum/ForumPage";
import ForumTopicPage from "../sections/forum/ForumTopicPage";
import PrivateHomepage from "../pages/PrivateHomepage";
import Toolbox from "../admin/Toolbox";
import InviteForm from "../profile/invite/InviteForm";
import InviteTree from "../profile/invite/InviteTree";
import PermissionManager from "../admin/PermissionManager";
import NewTopicForm from "../sections/forum/NewTopicForm";
import ErrorBoundary from "./ErrorBoundary";
import FallbackComponent from "./FallbackComponent";
import ContributeForm from "../sections/contribute/ContributeForm";
import CommunitiesPage from "../sections/communities/CommunitiesPage";
import PermissionFormPage from "../admin/PermissionFormPage"; // VScode is throwing an error but seems fine (capitalization of file)

const logErrorToService = (error, info) => {
  //TODO
  console.log(error, info);
};

const PrivateContent = ({ userId, userName }) => {
  return (
    <div id="content">
      <Routes>
        <Route
          path="user/invite-tree"
          element={<InviteTree userId={userId} />}
        />
        <Route
          path="staff/tools/permissions/new"
          element={<PermissionFormPage userId={userId} />}
        />
        <Route
          path="staff/tools/permissions/:id/edit"
          element={<PermissionFormPage />}
        />
        <Route
          path="staff/tools/permissions"
          element={<PermissionManager userId={userId} />}
        />
        <Route
          path="staff/tools"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <Toolbox userId={userId} />
            </ErrorBoundary>
          }
        />
        <Route
          path="forums/:forumId/topics/:forumTopicId"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <ForumTopicPage userId={userId} />
            </ErrorBoundary>
          }
        />
        <Route
          path="forums/:forumId/new"
          element={<NewTopicForm userId={userId} />}
        />
        <Route
          path="forums/:forumId"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <ForumPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="forums"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <ForumListData />
            </ErrorBoundary>
          }
        />
        <Route
          path="communities"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <CommunitiesPage userId={userId} />
            </ErrorBoundary>
          }
        />
        <Route
          path="contribute"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <ContributeForm userId={userId} />
            </ErrorBoundary>
          }
        />
        <Route
          path="invite"
          element={<InviteForm userId={userId} userName={userName} />}
        />
        <Route path="*" element={<PrivateHomepage userId={userId} />} />
      </Routes>
    </div>
  );
};

export default PrivateContent;
