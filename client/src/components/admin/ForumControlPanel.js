import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForumById } from "../../hooks/useForumById";
import { useForumCategoryById } from "../../hooks/useForumCategoryById";
import {
  createForum,
  getForumIds,
  getForumById,
  getForumCategoryIds,
  getForumCategoryById,
} from "../../actions/forum";

const ForumControlPanel = () => {
  const dispatch = useDispatch();
  const forumIds = useSelector((state) => state.forum.forumIds);
  const forumCategoryIds = useSelector((state) => state.forum.forumCategoryIds);
  const [categoryId, setCategoryId] = useState("");
  const forumCategories = useSelector((state) => state.forum.forumCategories);

  useEffect(() => {
    dispatch(getForumCategoryIds());
    dispatch(getForumIds());
  }, []); // Empty dependency array means this effect only runs on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    const forumCategory = categoryId;
    const sort = e.target.sort.value;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const minClassRead = e.target.minClassRead.value;
    const minClassWrite = e.target.minClassWrite.value;
    const minClassCreate = e.target.minClassCreate.value;
    const autoLock = e.target.autoLock.checked.value;
    const autoLockWeeks = e.target.autoLockWeeks.value;

    dispatch(
      createForum(
        forumCategory,
        sort,
        name,
        description,
        minClassRead,
        minClassWrite,
        minClassCreate,
        autoLock,
        autoLockWeeks
      )
    );
  };

  const categoryChange = (e) => {
    setCategoryId(e.target.value);
  };
  console.log(forumCategories);
  return (
    <div>
      <div>
        <h3>Forum Category Control Panel</h3>
      </div>
      {forumIds.map((forumId) => (
        <Forum key={forumId} forumId={forumId} />
      ))}
      <div>
        <div className="new-forum-category">
          <h4>Create a new forum</h4>
          <form className="create_form" onSubmit={handleSubmit}>
            <div>
              {forumCategories && Object.values(forumCategories).length > 0 && (
                <select
                  name="categoryId"
                  id="categoryId"
                  value={categoryId}
                  onChange={categoryChange}
                >
                  <option value="">Select a category</option>
                  {Object.values(forumCategories).map((category, index) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}

              <label htmlFor="sort">Sort</label>
              <input type="number" name="sort" />
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
              <label htmlFor="description">Description</label>
              <input type="text" name="description" />
              <label htmlFor="minClassRead">Min Class Read</label>
              <input type="number" name="minClassRead" />
              <label htmlFor="minClassWrite">Min Class Write</label>
              <input type="number" name="minClassWrite" />
              <label htmlFor="minClassCreate">Min Class Create</label>
              <input type="number" name="minClassCreate" />
              <label htmlFor="autoLock">Auto Lock</label>
              <input type="checkbox" name="autoLock" />
              <label htmlFor="autoLockWeeks">Auto Lock Weeks</label>
              <input type="number" name="autoLockWeeks" />
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Forum = ({ forumId }) => {
  const dispatch = useDispatch();
  const { forums } = useForumById(forumId);

  useEffect(() => {
    dispatch(getForumById(forumId));
  }, [forumId, dispatch]);

  return (
    <div>
      <h4>Forum ID: {forumId}</h4>
      {/* Render the forums */}
    </div>
  );
};

export default ForumControlPanel;
