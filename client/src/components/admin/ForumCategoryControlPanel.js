import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForumCategoryById } from "../../hooks/useForumCategoryById";
import {
  createForumCategory,
  getForumCategoryIds,
  getForumCategoryById,
} from "../../actions/forum";

const ForumCategoryControlPanel = () => {
  const dispatch = useDispatch();
  const forumCategoryIds = useSelector((state) => state.forum.forumCategoryIds);

  useEffect(() => {
    dispatch(getForumCategoryIds());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sort = e.target.sort.value;
    const name = e.target.name.value;
    dispatch(createForumCategory(sort, name));
  };

  return (
    <div>
      <div>
        <h3>Forum Category Control Panel</h3>
      </div>
      {forumCategoryIds.map((categoryId) => (
        <ForumCategory key={categoryId} categoryId={categoryId} />
      ))}
      <div>
        <div className="new-forum-category">
          <h4>Create a new forum category</h4>
          <form className="create_form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="sort">Sort</label>
              <input type="number" name="sort" />
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ForumCategory = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { forums } = useForumCategoryById(categoryId);

  useEffect(() => {
    dispatch(getForumCategoryById(categoryId));
  }, [categoryId, dispatch]);

  return (
    <div>
      <h4>Category ID: {categoryId}</h4>
      {/* Render the forums */}
    </div>
  );
};

export default ForumCategoryControlPanel;
