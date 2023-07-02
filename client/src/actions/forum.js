import {
  GET_ALL_FORUMS,
  GET_FORUM_BY_ID,
  CREATE_FORUM,
  GET_ALL_FORUM_CATEGORIES,
  GET_FORUM_CATEGORY_BY_ID,
  CREATE_FORUM_CATEGORY,
  UPDATE_FORUM_CATEGORY,
  DELETE_FORUM_CATEGORY,
  FORUM_ERROR,
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST,
  CREATE_FORUM_TOPIC,
  GET_ALL_FORUM_TOPICS,
  UPDATE_FORUM_TOPIC,
  DELETE_FORUM_TOPIC,
} from './types';
import api from '../utils/api';

// Forums
export const getAllForums = () => async dispatch => {
  try {
    const res = await api.get('/forums');
    dispatch({
      type: GET_ALL_FORUMS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getForumById = id => async dispatch => {
  try {
    const res = await api.get(`/forums/${id}`);
    dispatch({
      type: GET_FORUM_BY_ID,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const createForum = forumData => async dispatch => {
  try {
    const res = await api.post('/forums', forumData);
    dispatch({
      type: CREATE_FORUM,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Forum Categories
export const getAllForumCategories = () => async dispatch => {
  try {
    const res = await api.get('/forums/categories');
    dispatch({
      type: GET_ALL_FORUM_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getForumCategoryById = id => async dispatch => {
  try {
    const res = await api.get(`/forums/categories/${id}`);
    dispatch({
      type: GET_FORUM_CATEGORY_BY_ID,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const createForumCategory = categoryData => async dispatch => {
  try {
    const res = await api.post('/forums/categories', categoryData);
    dispatch({
      type: CREATE_FORUM_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const updateForumCategory = (id, categoryData) => async dispatch => {
  try {
    const res = await api.put(`/forums/categories/${id}`, categoryData);
    dispatch({
      type: UPDATE_FORUM_CATEGORY,
      payload: { id, ...res.data }
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteForumCategory = id => async dispatch => {
  try {
    await api.delete(`/forums/categories/${id}`);
    dispatch({
      type: DELETE_FORUM_CATEGORY,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


//Forum posts

export const createForumPost = (body, topicId) => async dispatch => {
  try {
    const res = await api.post('/forums/posts', { body, topicId });
    dispatch({
      type: CREATE_FORUM_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getAllForumPosts = () => async dispatch => {
  try {
    const res = await api.get('/forums/posts');
    dispatch({
      type: GET_ALL_FORUM_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getForumPostById = id => async dispatch => {
  try {
    const res = await api.get(`/forums/posts/${id}`);
    dispatch({
      type: GET_FORUM_POST_BY_ID,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteForumPost = id => async dispatch => {
  try {
    await api.delete(`/forums/posts/${id}`);
    dispatch({
      type: DELETE_FORUM_POST,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Forum topics

export const createForumTopic = (title, forumId, body, question, answers) => async dispatch => {
  try {
    const res = await api.post('/forums/topics', { title, forumId, body, question, answers });
    dispatch({
      type: CREATE_FORUM_TOPIC,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getAllForumTopics = () => async dispatch => {
  try {
    const res = await api.get('/forums/topics');
    dispatch({
      type: GET_ALL_FORUM_TOPICS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const updateForumTopic = (id, title) => async dispatch => {
  try {
    const res = await api.put(`/forums/topics/${id}`, { title });
    dispatch({
      type: UPDATE_FORUM_TOPIC,
      payload: { id, ...res.data }
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteForumTopic = id => async dispatch => {
  try {
    await api.delete(`/forums/topics/${id}`);
    dispatch({
      type: DELETE_FORUM_TOPIC,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
