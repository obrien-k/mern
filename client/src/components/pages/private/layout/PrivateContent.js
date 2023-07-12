import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../../../layout/ErrorBoundary";
import FallbackComponent from "../../../layout/FallbackComponent";

import PrivateHomepage from "../../../pages/private/PrivateHomepage";
import Toolbox from "../../../admin/Toolbox";
import InviteForm from "../../../profile/invite/InviteForm";
import InviteTree from "../../../profile/invite/InviteTree";

// Communities
import ContributeForm from "../../../sections/contribute/ContributeForm";
import CommunitiesPage from "../../../sections/communities/CommunitiesPage";
import CommunityPage from "../../../sections/communities/CommunityPage";

// Forum
import ForumHomePage from "../../../sections/forum/ForumHomePage";
import ForumCategoryPage from "../../../sections/forum/ForumCategoryPage";
import ForumPage from "../../../sections/forum/ForumPage";
import ForumTopicPage from "../../../sections/forum/ForumTopicPage";
import NewTopicForm from "../../../sections/forum/NewTopicForm";

// Toolbox
import PermissionManager from "../../../admin/PermissionManager";
import PermissionFormPage from "../../../admin/PermissionFormPage";
import ForumCategoryControlPanel from "../../../admin/ForumCategoryControlPanel";
import ForumControlPanel from "../../../admin/ForumControlPanel";

const logErrorToService = async (error, info) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    errorType: error.name,
    errorMessage: error.message,
    stackTrace: error.stack,
    additionalInfo: info,
  };
  console.log(error, info);
  console.log(
    errorData +
      "localized error data, start this todo (implement logstash or similar)"
  );
};

const PrivateContent = () => {
  return (
    <div id="content">
      <Routes>
        <Route path="/private/user/invite-tree" element={<InviteTree />} />
        <Route
          path="staff/tools/permissions/new"
          element={<PermissionFormPage />}
        />
        <Route
          path="staff/tools/permissions/:id/edit"
          element={<PermissionFormPage />}
        />
        <Route path="staff/tools/permissions" element={<PermissionManager />} />
        <Route
          path="staff/tools/categories"
          element={<ForumCategoryControlPanel />}
        />
        <Route path="staff/tools/forums" element={<ForumControlPanel />} />
        <Route path="staff/tools" element={<Toolbox />} />
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
              <ForumTopicPage />
            </ErrorBoundary>
          }
        />
        <Route path="forums/:forumId/new" element={<NewTopicForm />} />
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
          path="forums0"
          element={
            <ErrorBoundary
              FallbackComponent={FallbackComponent}
              onError={logErrorToService}
              onReset={() => {
                // TODO reset state so it doesn't happen again
              }}
            >
              <ForumHomePage />
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
              <ForumCategoryPage />
            </ErrorBoundary>
          }
        />
        <Route path="communities/:communityId" element={<CommunityPage />} />
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
              <CommunitiesPage />
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
              <ContributeForm />
            </ErrorBoundary>
          }
        />
        <Route path="invite" element={<InviteForm />} />
        <Route path="*" element={<PrivateHomepage />} />
      </Routes>
    </div>
  );
};

export default PrivateContent;
