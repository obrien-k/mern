import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForumCategoryIds } from "../../../actions/forum";
import ForumCategoryRow from "./ForumCategoryRow";
import CategoryForums from "./CategoryForums"; // We will create this component next.

const ForumHomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumCategoryIds());
  }, [dispatch]);

  const forumCategoryIds = useSelector((state) => state.forum.forumCategoryIds);

  return (
    <div>
      {forumCategoryIds &&
        forumCategoryIds.length > 0 &&
        forumCategoryIds.map((categoryId) => (
          <div key={categoryId}>
            <ForumCategoryRow id={categoryId} />
            <CategoryForums categoryId={categoryId} />
          </div>
        ))}
    </div>
  );
};

export default ForumHomePage;
